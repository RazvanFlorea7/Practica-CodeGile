class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.frequency = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let current = this.root;
        for (let char of word) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
        current.frequency++;
    }

    searchPrefix(prefix) {
        let current = this.root;
        for (let char of prefix) {
            if (!current.children[char]) {
                return null;
            }
            current = current.children[char];
        }
        return current;
    }

    autocomplete(prefix) {
        const suggestions = [];
        const node = this.searchPrefix(prefix);
        if (node) {
            this.findAllWords(node, prefix, suggestions);
        }
        return suggestions;
    }

    findAllWords(node, prefix, suggestions) {
        if (node.isEndOfWord) {
            suggestions.push({ word: prefix, frequency: node.frequency });
        }
        for (let char in node.children) {
            this.findAllWords(node.children[char], prefix + char, suggestions);
        }
    }
}

class AutocompleteSystem {
    constructor() {
        this.trie = new Trie();
    }

    addWord(word) {
        this.trie.insert(word);
    }

    getSuggestions(prefix) {
        const suggestions = this.trie.autocomplete(prefix);
        suggestions.sort((a, b) => b.frequency - a.frequency);
        return suggestions.map(s => s.word);
    }
}

// Example usage:
const autocompleteSystem = new AutocompleteSystem();
autocompleteSystem.addWord("hello");
autocompleteSystem.addWord("hi");
autocompleteSystem.addWord("he");
autocompleteSystem.addWord("hello");
autocompleteSystem.addWord("help");
autocompleteSystem.addWord("hero");

console.log(autocompleteSystem.getSuggestions("he"));
console.log(autocompleteSystem.getSuggestions("hel"));
