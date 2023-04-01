import { describe, test, expect, assert } from "vitest"
import { handleRandomWord, fetchWords, Words } from "../App"

describe("Fetch words and randomly select one", () => {

    test("should return an array of words from the API", async () => {
        const words = await fetchWords();

        expect(words).toBeDefined();
        expect(words.length).toBeGreaterThan(0);
        expect(words[0].id).toBeDefined;
        expect(words[0].word).toBeDefined;
    })


    const words = [
        { "id": 1, "word": "caca" },
        { "id": 2, "word": "pipi" },
        { "id": 3, "word": "cucu" },
        { "id": 4, "word": "bite" },
        { "id": 5, "word": "zizi" },
    ];

    test("return a string", () => {
        const word = handleRandomWord(words);
        expect(word).toBeDefined();
        expect(word).toBeTypeOf("string");
    })

    test("return a random word from the array", () => {
        const randomWord = handleRandomWord(words)
        const wordsArray = words.map((item) => item.word)
        expect(wordsArray).toContain(randomWord)
    })

    // test("return undefined if empty array", () => {

    //     const randomWord = randomSolution([]);
    //     expect(randomWord).toBeUndefined;
    // })
})