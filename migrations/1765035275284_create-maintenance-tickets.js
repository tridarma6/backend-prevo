exports.up = (pgm) => {
  pgm.createTable('maintenance_tickets', {
    id: 'id',
    title: { type: 'varchar(255)', notNull: true },
    description: { type: 'text', notNull: true },
    status: { type: 'varchar(50)', notNull: true, default: 'need_maintenance' },
    user_id: { type: 'integer', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    created_at: { type: 'varchar(50)', notNull: true },
    updated_at: { type: 'varchar(50)', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('maintenance_tickets');
};
