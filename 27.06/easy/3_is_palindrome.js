function isPalindrome(string){
    if(string.split("").reverse().join("") == string){
        return "Palindrome"
    }  else return "Not Palindrome"
}
console.log(isPalindrome("TENET"))