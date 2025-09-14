const path = require('path');
const files = ['./routes/user', './routes/book', './routes/favourites', './routes/cart', './routes/order'];

files.forEach(f => {
  try {
    const full = path.join(process.cwd(), f);
    console.log('Requiring', f, 'from', full);
    const m = require(full);
    console.log('-> type:', typeof m);
    if (m && typeof m === 'object') {
      console.log('-> keys:', Object.keys(m));
      // detect express Router
      if (m.stack) {
        console.log('-> looks like an express Router (has stack)');
      }
    }
  } catch (e) {
    console.error('ERROR requiring', f);
    console.error(e && e.stack ? e.stack : e);
  }
});

console.log('Done');
