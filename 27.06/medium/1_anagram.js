function isAnagram(str1, str2){
    let map1 = [];
    let map2 = [];
    for (i=0; i<str1.length; i++){
        map1[str1[i]] = (map1[str1[i]] || 0) + 1;
        map2[str2[i]] = (map2[str2[i]] || 0) + 1;
    }
    
    for(key in map1){
        if (map1[key] != map2[key]){
            return "Not Anagram"
        }
    }
    return "Anagram"
}
console.log(isAnagram("baba", "abba"))