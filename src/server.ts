console.log('Hello')

const getNewId = (items) => {
  
  
  if (items.length == 0) {
    return 1;
  
  }

  const ids = ?items.map((i) => i.id);

  return Math.max(...ids) + 1;
};
