import app from './app.js';
import config from '../config/index.js';

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${PORT}`);
});
