module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, 
    connection: {
      filename: './project.db3',
    },
  },
};
