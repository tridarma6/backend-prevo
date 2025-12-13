exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    phone_number: { type: 'varchar(50)', notNull: true },
    password: { type: 'text', notNull: true },
    role: { type: 'varchar(50)', notNull: true, default: 'user' },
    created_at: { type: 'varchar(50)', notNull: true },
    updated_at: { type: 'varchar(50)', notNull: true },
  });

  pgm.addConstraint('users', 'users_role_check', 'CHECK (role IN (\'user\', \'admin\'))');
  pgm.createIndex('users', 'email');

  pgm.sql(`
    INSERT INTO users(name, email, phone_number, password, role, created_at, updated_at) VALUES 
    ('Admin Putu Rifki', 'puturifki56@gmail.com', '0881038194017', '$2b$10$kujFrozzV8b48pYBjMOZUem7mGQu4E46OsxdKpxzff5RzahYNZ7S2', 'admin', '25-12-04 22:32:01.01072+08', '25-12-04 22:32:01.01072+08'),
    ('Admin Candra Wikananta', 'candrawikananta@gmail.com', '0881038194017', '$2b$10$kujFrozzV8b48pYBjMOZUem7mGQu4E46OsxdKpxzff5RzahYNZ7S2', 'admin', '25-12-04 22:32:01.01072+08', '25-12-04 22:32:01.01072+08'),
    ('Admin Tri Darma', 'tridarma@gmail.com', '0881038194017', '$2b$10$kujFrozzV8b48pYBjMOZUem7mGQu4E46OsxdKpxzff5RzahYNZ7S2', 'admin', '25-12-04 22:32:01.01072+08', '25-12-04 22:32:01.01072+08'),
    ('Predicta Chatbot', 'predictachatbot@gmail.com', '0881038194017', '$2b$10$kujFrozzV8b48pYBjMOZUem7mGQu4E46OsxdKpxzff5RzahYNZ7S2', 'admin', '25-12-04 22:32:01.01072+08', '25-12-04 22:32:01.01072+08');
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};