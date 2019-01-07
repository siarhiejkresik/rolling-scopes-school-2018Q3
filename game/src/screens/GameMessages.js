const startGame = {
  message: 'Пачынаем гульню!',
  size: 'bigger',
  animationIn: 'jackInTheBox',
  animationOut: 'fadeOut',
};

const endGame = {
  message: 'Канец гульні',
  size: 'bigger',
  animationIn: 'jackInTheBox',
};

const winRound = {
  message: 'Перамога!',
  size: 'bigger',
  animationIn: 'bounceInDown',
};

const roundNumber = number => ({
  message: `Бой ${number}`,
});

const enemyName = name => ({
  message: name,
});

export {
  startGame, endGame, winRound, roundNumber, enemyName,
};
