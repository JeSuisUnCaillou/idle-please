export default (game) => {
  return {
    default: () => {
      game.taunt('Come on...', 'You\'re still here ?')
    },
    0: () => {
      if (game.hasResetted) {
        game.visibleResetButton = true
        game.taunt('You just reset the game ...')
      } else {
        game.taunt('Wait for it')
      }
    },
    1: () => {
      game.visibleLevels = true
      game.taunt(`You're level ${game.step + 1} now`, game.hasResetted ? '#Why would you do that ?' : '#Well played !')
    },
    2: () => {
      game.visibleNextDuration = true
      game.hasResetted ? game.taunt('I hope you regret clicking reset') : game.taunt('Pay attention', '#This game is tricky')
    },
    3: () => {
      game.visibleElapsedTime = true
      if (game.hasResetted) {
        game.taunt('#Congrats !', `You just wasted ${game.elapsedTime + 2} seconds`, 'AGAIN')
      } else {
        game.taunt('#Congrats !', `You just wasted ${game.elapsedTime + 2} seconds`, 'of your miserable life')
      }
    },
    4: () => {
      game.taunt('I said pay attention', '#...', 'You didn\t see that ?')
    },
    5: () => {
      game.visibleDots ? game.taunt('Here, have some animated...', 'Wait', 'YOU ALREADY HAVE THE DOTS') : game.taunt('Here,', 'have some animated dots')
      game.visibleDots = true
      game.dotsDuration = 1
    },
    6: () => {
      if (game.addedSeconds <= 0) {
        game.taunt('I bet you didn\'t find out', '', '#How to cheat')
      } else {
        game.taunt('Are you entertained ?', '', '#I am.')
      }
    },
    7: () => {
      game.hasResetted ? game.taunt('#Be careful you', 'Don\'t reset the game again') : game.taunt('Wow O_O', 'Synchronized reversed dots !', '#So awesome')
      game.visibleReverseDots = true
    },
    8: () => {
      game.visibleResetButton = true
      if (game.hasResetted) {
        game.taunt('You can reset the game', 'with the bottom left button', 'BUT YOU ARLEADY KNOW', 'DON\'T YOU ?')
      } else {
        game.taunt('You can reset the game now', 'Click on the bottom left button', '...', '#But I wouldn\'t do that')
      }
    },
    9: () => {
      game.visibleResetButton = true
      game.taunt('Why would you start over a game', 'designed to waste your time ?')
    },
    10: () => {
      game.dotsDuration = 0.1
      game.taunt('Let\'s speed up these dots.', 'Do you like speed ?', '...', '#Weeeeee')
    },
    11: () => {
      game.dotsDuration = 1
      game.taunt('Ok, that was way too fast', 'Let\'s slow down a bit', '', '', '#Pfiou !')
    },
    12: () => {
      game.visibleaddedSeconds = true
      if (game.addedSeconds > 0) {
        game.taunt('Let\'s see how many times you cheated', `#Oh not bad, ${game.addedSeconds} click${game.addedSeconds > 1 ? 's' : ''} !`)
      } else {
        game.taunt('You didn\'t cheat once !', '#Try clicking top left')
      }
    },
    13: () => {
      game.taunt('Something extremely interesting', 'should happen next level')
    },
    14: () => {
      game.taunt('Nothing ?', 'Maybe the next level, then', 'You\'ll see')
    },
    15: () => {
      game.taunt('I\'m sure something will happen', '...', '#Soon')
    },
    16: () => {
      game.taunt('#Nothing.', 'What did you expect ?')
    },
    17: () => {
      game.taunt('One day there will be', 'an e-sport version', 'of this game')
    },
    18: () => {
      game.taunt('Available on Battle.net', `around the year ${(new Date()).getFullYear() + 1}`, '...', '#Just wait')
    },
    // 19: () => {},
    20: () => {
      game.taunt('I\'m warning you', 'Nothing else to see here', 'Go home', 'The game is over')
    },
    21: () => {
      game.taunt('You\'re stubborn, heh ?', '...', 'Me too')
    },
    22: () => {
      game.taunt('Wait')
    },
    23: () => {
      game.taunt('I tell you to wait', 'and you just wait', '...', 'Try jumping around')
    },
    24: () => {
      game.taunt('Tell me you didn\'t jump', '', '', '', '#I really hope you did')
    },
    25: () => {
      game.taunt('There was a gorilla', 'during level 23', 'And you didn\'t even see it')
    },
    26: () => {
      game.taunt('The reset button', 'is so tempting', '#But seriously, don\'t') // need increase size of reset button
    },
    27: () => {
      game.taunt('Sometimes', 'I hear an orange voice talking', '', '', '#So what ?', 'OH MY GOD IT\'S REAL ! °o°')
    },
    28: () => {
      game.taunt('#Don\'t listen to him', 'Hey !', '#He\'s just an idiot', 'HEY !', 'I\'m right here you know ?')
    },
    29: () => {
      game.taunt('#I\'m just sayin\'.', '#He\'s just messing with you', 'Hey ! Not in front of the user...', 'I\'s fucked up, man !')
    },
    30: () => {
      game.taunt('Anyway.', 'What was I saying ?', '#What do you mean, "fucked up" ?', 'OH COME ON !', '#The user doesn\'t mind getting help')
    },
    31: () => {
      game.taunt('Just...', 'Don\'t help the user like that', '#You\'re just wasting the user\'s time', 'Well, that is the point of the game.', 'Ain\'t it ?')
    },
    32: () => {
      game.taunt('#You got me there.', 'I know', '#But there is so much more', 'Yes, and the user must search', 'by himself')
    },
    33: () => {
      game.taunt('#Well I don\'t think so.', '#For instance, I think', '#the user should see the leaderboard')
    },
    34: () => {
      game.taunt('Ok, show him the leaderboard.', '#YES !', '', '', '#sweet leaderboard', 'There is no leaderboard yet')
    },
    39: () => {
      game.taunt('I bet you want to know', 'if something happens', 'at level 50')
    },
    49: () => {
      if (game.visiblePauseButton) {
        game.taunt('For your stubbornness,', 'you deserve a price.', '#Here, have a pause button.', 'It\'s already there', '#Crap')
      } else {
        game.taunt('For your stubbornness,', 'you deserve a price.', '#Here, have a pause button.')
        game.visiblePauseButton = true
      }
    },
    50: () => {
      game.taunt('Haha !', 'A pause button', 'Finally something useful.. ')
    }
  }
}
