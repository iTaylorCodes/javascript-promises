// PART 1

let favNumber = 13;
let baseNumURL = "http://numbersapi.com";
const $list = $('#facts')

// 1.
$.getJSON(`${baseNumURL}/${favNumber}?json`).then(data => {
  console.log(data);
});

// 2.
let favNumbers = [7, 16, 24];
$.getJSON(`${baseNumURL}/${favNumbers}?json`).then(data => {
  console.log(data);
});

// 3.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseNumURL}/${favNumber}?json`);
  })
).then(facts => {
  facts.forEach(data => $($list).append(`<li>${data.text}</li>`));
});

// PART 2
$(function() {
    let baseCardURL = "http://deckofcardsapi.com/api/deck";

// 1.
    $.getJSON(`${baseCardURL}/new/draw/?count=1`).then(data => {
        console.log(`${data.cards[0].value} of ${data.cards[0].suit}`)
    })

// 2.
    let card1 = null
    $.getJSON(`${baseCardURL}/new/draw/?count=1`)
        .then(data => {
        card1 = data.cards[0]
        return $.getJSON(`${baseCardURL}/${data.deck_id}/draw/?count=1`)
    }).then(data => {
        let card2 = data.cards[0]
        console.log(`Card 1 is the ${card1.value} of ${card1.suit}`)
        console.log(`Card 2 is the ${card2.value} of ${card2.suit}`)
    })

// 3.
    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');

    $.getJSON(`${baseCardURL}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $btn.show();
    });

    $btn.on('click', function() {
        $.getJSON(`${baseCardURL}/${deckId}/draw/`).then(data => {
            let cardImg = data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
            $('<img>', {
                src: cardImg,
                css: {
                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
            );
            if (data.remaining === 0) $btn.remove();
        });
    });
});