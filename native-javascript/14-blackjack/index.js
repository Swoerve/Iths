const aceOfHearts = {
    suit: "HEARTS",
    value: 1
}

function card(value, suit) {
    return { suit: suit, value: value }
}

function prettyCard(card) {
    result = ""
    switch (card.value) {
        case 1:
            result += "A"
            break;
        case 10:
            result += "T"
            break;
        case 11:
            result += "J"
            break;
        case 12:
            result += "Q"
            break;
        case 13:
            result += "K"
            break;
        default:
            result += card.value
            break;
    }
    switch (card.suit) {
        case "HEARTS":
            result += "♥"
            break;
        case "SPADES":
            result += "♠"
            break;
        case "DIAMONDS":
            result += "♦"
            break;
        case "CLUBS":
            result += "♣"
            break;

        default:
            break;
    }
    return result
}

function createDeck() {
    let deck = []
    let suits = ["HEARTS", "SPADES", "DIAMONDS", "CLUBS"]
    for (const suit of suits) {
        let i = 0
        while (i < 13) {
            deck.push(card(i + 1, suit))
            i++
        }
    }
    return deck
}

function draw(deck) {
    return deck.pop()
}

function shuffle(deck) {
    let currentIndex = deck.length
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)

        currentIndex--
        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]]
    }
}

function score(hand) {
    result = 0
    ace = false
    hand.forEach((c, _i) => {
        if (c.value === 1) {
            result += 11
            ace = true
        } else if (c.value > 10) {
            result += 10
        } else {
            result += c.value
        }
    })
    if (result > 21) {
        hand.forEach((c, _i) => {
            if (c.value === 1 && result > 21) {
                result -= 10
            }
        })
    }
    return result
}

let hearts = []

while (hearts.length < 13) {
    hearts[hearts.length] = card(hearts.length + 1, "HEARTS")
}

