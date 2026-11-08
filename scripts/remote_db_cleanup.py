import psycopg2

def clean_titles():
    # Try connecting with DB URL or postgres default
    conn = psycopg2.connect("postgresql://postgres:password@127.0.0.1:5432/koikoitravel")
    cur = conn.cursor()

    tables = ["State", "City", "TravelExperience", "CmsPage", "Journey", "Country", "BlogPost"]
    total_updated = 0

    print("=== DATABASE SEOTITLE DEDUPLICATION ===")
    for t in tables:
        try:
            # Check matching rows
            cur.execute(f'SELECT COUNT(*) FROM "{t}" WHERE "seoTitle" ~* \'(\\\\||-|_|–|—)\\\\s*KoiKoi\';')
            count_before = cur.fetchone()[0]

            # Run update: strip trailing | KoiKoi, | KoiKoi Travel, - KoiKoi Travel, etc. (run twice to strip chained ones)
            cur.execute(f'''
                UPDATE "{t}"
                SET "seoTitle" = REGEXP_REPLACE(
                    REGEXP_REPLACE("seoTitle", '\\\\s*(?:\\\\||-|_|–|—)\\\\s*KoiKoi(\\\\s*Travel)?\\\\s*$', '', 'i'),
                    '\\\\s*(?:\\\\||-|_|–|—)\\\\s*KoiKoi(\\\\s*Travel)?\\\\s*$', '', 'i'
                )
                WHERE "seoTitle" ~* '(?:\\\\||-|_|–|—)\\\\s*KoiKoi';
            ''')
            updated = cur.rowcount
            conn.commit()
            print(f"Table {t}: {updated} records updated (had {count_before} matching)")
            total_updated += updated
        except Exception as e:
            print(f"Table {t} error: {e}")
            conn.rollback()

    print(f"\nTotal records updated across all tables: {total_updated}")
    cur.close()
    conn.close()

if __name__ == "__main__":
    clean_titles()
