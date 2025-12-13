exports.up = (pgm) => {
  pgm.createTable('chat_logs', {
    id: 'id',
    sender_type: { type: 'text', notNull: true },
    message: { type: 'text', notNull: true },
    user_id: { type: 'integer', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    created_at: { type: 'varchar(50)', notNull: true },
    updated_at: { type: 'varchar(50)', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('chat_logs');
};
