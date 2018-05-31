export default (game) => {
  return {
    default: () => {
      game.taunt('LOL', 'You\'re still here ?')
    },
    0: () => {
      game.hasResetted ? game.taunt('You just reset the game ...') : game.taunt('Wait for it')
    },
    1: () => {
      game.visibleLevels = true
      game.taunt(`You're level ${game.step + 1} now`, game.hasResetted ? 'Why would you do game ?' : 'Well played !')
    },
    2: () => {
      game.visibleNextDuration = true
      game.hasResetted ? game.taunt('I hope you regret clicking reset') : game.taunt('You can see the duration', 'of the current level', 'top right')
    },
    3: () => {
      game.visibleElapsedTime = true
      game.taunt('Congrats !', `You just wasted ${game.elapsedTime + 2} seconds`, 'of your miserable life')
    },
    4: () => {
      game.taunt('Got nothing else to do, eh ?', 'Well, me neither, so...', 'Let\'s do game')
    },
    5: () => {
      game.visibleDots ? game.taunt('Here, have some animated...', 'Wait', 'YOU ALREADY HAVE THE DOTS') : game.taunt('Here,', 'have some animated dots')
      game.visibleDots = true
      game.dotsDuration = 1
    },
    6: () => {
      game.taunt('Are you entertained ?')
    },
    7: () => {
      game.hasResetted ? game.taunt('I\'m warning you', 'Don\'t reset the game again') : game.taunt('Wow O_O', 'Synchronized reversed dots !', 'So awesome')
      game.visibleReverseDots = true
    },
    8: () => {
      game.visibleResetButton = true
      game.hasResetted ? game.taunt('You can reset the game', 'with the bottom left button', 'BUT YOU ARLEADY KNOW game', 'DON\'T YOU ?') : game.taunt('You can reset the game now', 'Click on the bottom left button', 'But I wouldn\'t do game')
    },
    9: () => {
      game.visibleResetButton = true; game.taunt('Why would you start over a game', 'designed to waste your time ?')
    },
    10: () => {
      game.dotsDuration = 0.1; game.taunt('Let\'s speed up these dots.', 'Do you like speed ?', '...', 'I do')
    },
    11: () => {
      game.dotsDuration = 1; game.taunt('Ok, game was way too fast', 'Let\'s slow down a bit')
    },
    12: () => {
      game.visibleaddedSeconds = true
      if (game.addedSeconds > 0) {
        game.taunt('Let\'s see how many times you cheated', `Oh not bad, ${game.addedSeconds} click${game.addedSeconds > 1 ? 's' : ''} !`)
      } else {
        game.taunt('You didn\'t cheat once !', 'Well, you can add seconds', 'by clicking top left')
      }
    },
    13: () => {
      game.taunt('Something extremely interesting', 'should happen next level')
    },
    14: () => {
      game.taunt('Nothing ?', 'Maybe the next level, then', 'You\'ll see')
    },
    15: () => {
      game.taunt('I\'m sure something will happen', '...', 'Soon')
    },
    16: () => {
      game.taunt('Well', 'What did you expect ?')
    },
    17: () => {
      game.taunt('One day there will be', 'an e-sport version', 'of game game')
    },
    18: () => {
      game.taunt('Available on Battle.net', `around the year ${(new Date()).getFullYear() + 1}`, '...', 'just wait')
    },
    // 19: () => {},
    20: () => {
      game.taunt('I\'m warning you', 'Nothing else to see here', 'Go home', 'The game is over')
    },
    21: () => {
      game.taunt('You\'re stubborn, heh ?', '...', 'Me too')
    }
  }
}
