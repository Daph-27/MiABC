"""
Official Data Ingestion Script
Uses company-provided originalWords.sql to populate/update miabc.db
"""

import sqlite3
import re
import os

def ingest_from_sql():
    """Import data from originalWords.sql into miabc.db"""
    
    sql_file = "backend/originalWords.sql"
    db_file = "backend/miabc.db"
    
    print("=" * 80)
    print("MIABC DATA INGESTION")
    print("=" * 80)
    print(f"Source SQL: {sql_file}")
    print(f"Target DB:  {db_file}")
    print("=" * 80)
    
    if not os.path.exists(sql_file):
        print(f"❌ SQL file not found: {sql_file}")
        return False
    
    # Read SQL file
    with open(sql_file, 'r', encoding='utf-8') as f:
        sql_content = f.read()
    
    # Connect to database
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    
    # Ensure Tamil columns exist
    cursor.execute("PRAGMA table_info(originalWords)")
    columns = [col[1] for col in cursor.fetchall()]
    
    if 'tamilWord' not in columns:
        cursor.execute("ALTER TABLE originalWords ADD COLUMN tamilWord TEXT")
        print("✅ Added tamilWord column")
    
    if 'tamilPronunciation' not in columns:
        cursor.execute("ALTER TABLE originalWords ADD COLUMN tamilPronunciation TEXT")
        print("✅ Added tamilPronunciation column")
    
    conn.commit()
    
    # Execute SQL file
    try:
        cursor.executescript(sql_content)
        conn.commit()
        print("✅ Data imported from SQL file")
    except Exception as e:
        print(f"⚠️ Import note: {e}")
        conn.rollback()
    
    # Verify data
    cursor.execute("SELECT COUNT(*) FROM originalWords")
    total = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM originalWords WHERE tamilWord IS NOT NULL AND tamilWord != ''")
    with_tamil = cursor.fetchone()[0]
    
    print("\n" + "=" * 80)
    print("INGESTION COMPLETE")
    print("=" * 80)
    print(f"📊 Total records: {total}")
    print(f"🔤 With Tamil: {with_tamil}")
    print(f"⚠️  Without Tamil: {total - with_tamil}")
    
    # Show sample
    cursor.execute("SELECT englishName, spanishName, tamilWord FROM originalWords LIMIT 5")
    print("\n📚 Sample data:")
    for row in cursor.fetchall():
        tamil = row[2] if row[2] else "(not set)"
        print(f"  {row[0]:20} | {row[1]:20} | {tamil}")
    
    conn.close()
    print("\n✅ Database ready for use!")
    return True

if __name__ == "__main__":
    ingest_from_sql()
