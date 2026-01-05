"""
Simple Database Viewer for MiABC
Shows all data stored in the SQLite database
"""
import sqlite3
import os

db_path = 'miabc.db'

if not os.path.exists(db_path):
    print(f"❌ Database not found at: {os.path.abspath(db_path)}")
    exit(1)

print("\n" + "="*80)
print(f"📊 DATABASE VIEWER - {os.path.abspath(db_path)}")
print("="*80)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# List all tables
print("\n📋 TABLES IN DATABASE:")
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()
for table in tables:
    cursor.execute(f"SELECT COUNT(*) FROM {table[0]}")
    count = cursor.fetchone()[0]
    print(f"  ✓ {table[0]:<20} ({count} records)")

# Show Users
print("\n" + "="*80)
print("👥 USERS TABLE")
print("="*80)
cursor.execute('SELECT userId, accessCode, guardianName, learnerName, guardianEmail, username, learnerGrade FROM users')
users = cursor.fetchall()

if users:
    for user in users:
        print(f"\n  User ID: {user[0]}")
        print(f"  Access Code: {user[1]}")
        print(f"  Guardian: {user[2]}")
        print(f"  Learner: {user[3]}")
        print(f"  Email: {user[4]}")
        print(f"  Username: {user[5]}")
        print(f"  Grade: {user[6]}")
        print("  " + "-"*60)
    print(f"\n  Total Users: {len(users)}")
else:
    print("  No users found")

# Show Family Members
print("\n" + "="*80)
print("👨‍👩‍👧‍👦 FAMILY MEMBERS TABLE")
print("="*80)
cursor.execute('SELECT * FROM familyMembers')
family = cursor.fetchall()

if family:
    for member in family:
        print(f"\n  ID: {member[0]} | User ID: {member[1]}")
        print(f"  Name: {member[2]}")
        print(f"  Relation: {member[3]}")
        print(f"  Created: {member[5]}")
else:
    print("  No family members found")

# Show Word Statistics
print("\n" + "="*80)
print("📚 ORIGINAL WORDS TABLE")
print("="*80)
cursor.execute('SELECT COUNT(*) FROM originalWords')
total_words = cursor.fetchone()[0]
print(f"  Total Words: {total_words}")

if total_words > 0:
    cursor.execute('SELECT COUNT(DISTINCT initials) FROM originalWords WHERE initials IS NOT NULL')
    unique_initials = cursor.fetchone()[0]
    print(f"  Unique Initials: {unique_initials}")
    
    cursor.execute('SELECT COUNT(DISTINCT type) FROM originalWords WHERE type IS NOT NULL')
    unique_types = cursor.fetchone()[0]
    print(f"  Word Types: {unique_types}")
    
    print("\n  Sample Words:")
    cursor.execute('SELECT id, englishName, spanishName, tamilWord FROM originalWords LIMIT 5')
    for word in cursor.fetchall():
        print(f"    {word[0]:3d}. EN: {word[1]:<15} | ES: {word[2]:<15} | TA: {word[3] or 'N/A'}")

conn.close()

print("\n" + "="*80)
print("🔧 HOW TO VIEW DATABASE IN GUI:")
print("="*80)
print("  1. DB Browser for SQLite: https://sqlitebrowser.org/")
print("  2. VS Code Extension: Search 'SQLite' in Extensions")
print("  3. DBeaver (Universal): https://dbeaver.io/")
print(f"\n  📁 Database Path: {os.path.abspath(db_path)}")
print("="*80 + "\n")
