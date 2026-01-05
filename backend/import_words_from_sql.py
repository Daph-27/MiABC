"""
Import words from originalWords.sql to database
"""
import sqlite3
import re

# Read SQL file
with open('originalWords.sql', 'r', encoding='utf-8') as f:
    sql_content = f.read()

# The SQL has one INSERT with multiple value tuples separated by commas
# Extract the part after VALUES and before the final semicolon
values_match = re.search(r'VALUES\s+(.*?);', sql_content, re.DOTALL)
if not values_match:
    print("Could not find VALUES clause")
    exit(1)

values_section = values_match.group(1)

# Split by ),  to get individual value tuples
# Each tuple starts with ( and ends with )
tuples = re.findall(r'\((.*?)\)(?:,|\s*$)', values_section, re.DOTALL)

print(f"Found {len(tuples)} word entries in SQL file")

# Connect to database
conn = sqlite3.connect('miabc.db')
cursor = conn.cursor()

# Clear existing words
cursor.execute('DELETE FROM originalWords')
print("Cleared existing words")

# Insert words
inserted = 0
for tuple_str in tuples:
    # Parse values
    values = tuple_str.split(',')
    
    # Map to our schema (remove userid and other fields we don't need)
    # Original: userid, englishName, englishSound, imagePath, initials, isComplete, isCreated, isEdited, recordFlag, spanishBreakUp, spanishName, spanishSound, tamilWord, tamilPronunciation, key, type, dateComplete, tema, letra, createdAtDate, createdAtHourMin, updatedAtDate, useridOriginal
    # Our schema: englishName, englishSound, spanishName, spanishSound, tamilWord, tamilPronunciation, imagePath, initials, recordFlag, key, type, tema, letra
    
    try:
        english_name = values[1].strip().strip("'")
        english_sound = values[2].strip().strip("'")
        image_path = values[3].strip().strip("'")
        initials = values[4].strip().strip("'")
        record_flag = values[8].strip().strip("'")
        spanish_name = values[10].strip().strip("'")
        spanish_sound = values[11].strip().strip("'")
        tamil_word = values[12].strip()
        tamil_pronunciation = values[13].strip()
        key_val = values[14].strip()
        word_type = values[15].strip().strip("'")
        tema = values[17].strip().strip("'")
        letra = values[18].strip().strip("'")
        
        # Convert NULL to None
        tamil_word = None if tamil_word == 'NULL' else tamil_word.strip("'")
        tamil_pronunciation = None if tamil_pronunciation == 'NULL' else tamil_pronunciation.strip("'")
        key_val = None if key_val == 'NULL' else key_val.strip("'")
        
        cursor.execute("""
            INSERT INTO originalWords 
            (englishName, englishSound, spanishName, spanishSound, tamilWord, tamilPronunciation, 
             imagePath, initials, recordFlag, key, type, tema, letra, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        """, (english_name, english_sound, spanish_name, spanish_sound, tamil_word, tamil_pronunciation,
              image_path, initials, record_flag, key_val, word_type, tema, letra))
        
        inserted += 1
        
    except Exception as e:
        print(f"Error inserting word: {e}")
        print(f"Values: {values[:5]}")
        continue

conn.commit()
conn.close()

print(f"\n✅ Successfully imported {inserted} words!")
print(f"\nRun 'python view_database.py' to verify")
