// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Check if cards are valid using the Luhn Algorithm
const validateCred = array => {
    let totalSum = 0
    for (i = array.length; i > 0; i -= 2) {
        totalSum += array[i-1]
        const doubledNum = array[i-2] * 2
        if (doubledNum > 9) {
            totalSum += doubledNum - 9
        } else if (doubledNum <= 9) {
            totalSum += doubledNum
        } else {
            continue
        }
    }
//    console.log(totalSum) //check the sum
    if ((totalSum % 10) === 0) {
        return true
    } else {
        return false
    }
}

// Check validateCred function:
// console.log(validateCred(valid1)); // Should print true
// console.log(validateCred(invalid1)); // Should print false

const findInvalidCards = nestedArray => {
    let invalidCards = []
    for (let i = 0; i < nestedArray.length; i++) {
        if (!validateCred(nestedArray[i])) {
            invalidCards.push(nestedArray[i])
        }
    }
    return invalidCards
}

// Check findInvalidCards function:
// console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5])); // Shouldn't print anything
// console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); // Should print all of the numbers
// console.log(findInvalidCards(batch)); // Test what the mystery numbers are

function idInvalidCardCompanies(nestedArrayOfCards) {
    const invalidCards = findInvalidCards(nestedArrayOfCards)
    let companies = []

    for (let i = 0; i < invalidCards.length; i++) {
        switch (invalidCards[i][0]) {
          case 3:
            if (companies.indexOf('Amex') === -1) {
              companies.push('Amex');
            }
            break
          case 4:
            if (companies.indexOf('Visa') === -1) {
              companies.push('Visa');
            }
            break
          case 5:
            if (companies.indexOf('Mastercard') === -1) {
              companies.push('Mastercard');
            }
            break
          case 6:
            if (companies.indexOf('Discover') === -1) {
              companies.push('Discover');
            }
            break
          default:
            console.log('Company not found');
        }
      }
      return companies
}

// Check idInvalidCardCompanies function:
console.log(idInvalidCardCompanies([invalid1])); // Should print['visa']
console.log(idInvalidCardCompanies([invalid2])); // Should print ['mastercard']
console.log(idInvalidCardCompanies(batch)); // Find out which companies have mailed out invalid cards
