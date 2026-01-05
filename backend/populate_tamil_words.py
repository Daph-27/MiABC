"""
Populate database with Tamil words from Firebase
This script adds sample words with Tamil translations to the database
"""

from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

# Create tables
models.Base.metadata.create_all(bind=engine)

# Sample words with Tamil translations
SAMPLE_WORDS = [
    {
        "englishName": "Fan",
        "spanishName": "Abanico",
        "tamilWord": "விசிறி",
        "tamilPronunciation": "visiri",
        "englishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Ffan.mp3?alt=media&",
        "spanishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fabanico.mp3?alt=media&",
        "imagePath": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/reading%2Fabanico.jpg?alt=media&",
        "initials": "Ff",
        "type": "object",
        "recordFlag": "true"
    },
    {
        "englishName": "Bee",
        "spanishName": "Abeja",
        "tamilWord": "தேனீ",
        "tamilPronunciation": "tēnī",
        "englishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fbee.mp3?alt=media&",
        "spanishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fabeja.mp3?alt=media&",
        "imagePath": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/images%2Fbee.jpg?alt=media&",
        "initials": "Bb",
        "type": "animal",
        "recordFlag": "true"
    },
    {
        "englishName": "Coat",
        "spanishName": "Abrigo",
        "tamilWord": "கோட்",
        "tamilPronunciation": "kōṭ",
        "englishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fcoat.mp3?alt=media&",
        "spanishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fabrigo.mp3?alt=media&",
        "imagePath": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/images%2Fcoat.jpg?alt=media&",
        "initials": "Cc",
        "type": "clothing",
        "recordFlag": "true"
    },
    {
        "englishName": "Grandmother",
        "spanishName": "Abuela",
        "tamilWord": "பாட்டி",
        "tamilPronunciation": "pāṭṭi",
        "englishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fgrandmother.mp3?alt=media&",
        "spanishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fabuela.mp3?alt=media&",
        "imagePath": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/images%2Fgrandmother.jpg?alt=media&",
        "initials": "Gg",
        "type": "family",
        "tema": "familia",
        "recordFlag": "true"
    },
    {
        "englishName": "Grandfather",
        "spanishName": "Abuelo",
        "tamilWord": "தாத்தா",
        "tamilPronunciation": "tāttā",
        "englishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fgrandfather.mp3?alt=media&",
        "spanishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fabuelo.mp3?alt=media&",
        "imagePath": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/images%2Fgrandfather.jpg?alt=media&",
        "initials": "Gg",
        "type": "family",
        "tema": "familia",
        "recordFlag": "true"
    },
    {
        "englishName": "Avocado",
        "spanishName": "Aguacate",
        "tamilWord": "வெண்ணெய் பழம்",
        "tamilPronunciation": "veṇṇey paḻam",
        "englishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Favocado.mp3?alt=media&",
        "spanishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Faguacate.mp3?alt=media&",
        "imagePath": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/images%2Favocado.jpg?alt=media&",
        "initials": "Aa",
        "type": "food",
        "recordFlag": "true"
    },
    {
        "englishName": "Eagle",
        "spanishName": "Águila",
        "tamilWord": "கழுகு",
        "tamilPronunciation": "kaḻuku",
        "englishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Feagle.mp3?alt=media&",
        "spanishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Faguila.mp3?alt=media&",
        "imagePath": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/images%2Feagle.jpg?alt=media&",
        "initials": "Ee",
        "type": "animal",
        "recordFlag": "true"
    },
    {
        "englishName": "Needle",
        "spanishName": "Aguja",
        "tamilWord": "ஊசி",
        "tamilPronunciation": "ūsi",
        "englishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fneedle.mp3?alt=media&",
        "spanishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Faguja.mp3?alt=media&",
        "imagePath": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/images%2Fneedle.jpg?alt=media&",
        "initials": "Nn",
        "type": "object",
        "recordFlag": "true"
    },
    {
        "englishName": "Garlic",
        "spanishName": "Ajo",
        "tamilWord": "பூண்டு",
        "tamilPronunciation": "pūṇṭu",
        "englishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fgarlic.mp3?alt=media&",
        "spanishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fajo.mp3?alt=media&",
        "imagePath": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/images%2Fgarlic.jpg?alt=media&",
        "initials": "Gg",
        "type": "food",
        "recordFlag": "true"
    },
    {
        "englishName": "Rug",
        "spanishName": "Alfombra",
        "tamilWord": "விரிப்பு",
        "tamilPronunciation": "virippu",
        "englishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Frug.mp3?alt=media&",
        "spanishSound": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Falfombra.mp3?alt=media&",
        "imagePath": "https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/images%2Frug.jpg?alt=media&",
        "initials": "Rr",
        "type": "object",
        "recordFlag": "true"
    }
]

def populate_database():
    """Populate database with sample Tamil words"""
    db = SessionLocal()
    
    try:
        # Check if words already exist
        existing_words = db.query(models.OriginalWord).count()
        
        if existing_words > 0:
            print(f"⚠️ Database already has {existing_words} words")
            response = input("Do you want to add more words? (y/n): ")
            if response.lower() != 'y':
                print("Cancelled.")
                return
        
        # Add sample words
        added = 0
        for word_data in SAMPLE_WORDS:
            # Check if word already exists
            existing = db.query(models.OriginalWord).filter(
                models.OriginalWord.englishName == word_data["englishName"]
            ).first()
            
            if not existing:
                word = models.OriginalWord(**word_data)
                db.add(word)
                added += 1
                print(f"✅ Added: {word_data['englishName']} / {word_data['spanishName']} / {word_data['tamilWord']}")
            else:
                print(f"⏭️ Skipped (exists): {word_data['englishName']}")
        
        db.commit()
        print(f"\n🎉 Successfully added {added} words with Tamil translations!")
        print(f"📊 Total words in database: {db.query(models.OriginalWord).count()}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 MiABC Database Population Script")
    print("=" * 50)
    print("This will add sample words with Tamil translations")
    print("All words include Firebase storage URLs for audio and images")
    print("=" * 50)
    populate_database()
