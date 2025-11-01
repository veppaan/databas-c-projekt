API till C#.NET projektet Quizzing
Skapad av Vera Kippel

Tabellens namn heter "quizzes" som skapats med hjälp av MongoDB och mongoose.
Tabellens innehåll:
- _id
- username(string)
- score(string)
- date(Date)


Användning:

|Metod | Ändpunkt | Beskrivning |
-------|----------|-------------|
|GET | "/" | Visar ett välkomstmeddelande|
|GET | "/results" | Hämta alla lagrade resultat|
|POST| "/results" | Lägg till ett resultat |
|PUT| "/results/:id" | Ger bara ett meddelande då du inte kan ändra ett resultat |
|DELETE | "/results/:id" | Radera ett resultat med angivet id|

Resultatets JSON-struktur kan se ut såhär:
```json
{
    "username": "Vera",
    "score": "2/5 correct answers",
}