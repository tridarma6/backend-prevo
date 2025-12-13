exports.up = (pgm) => {
  pgm.createTable('assign_maintenance_tasks', {
    id: 'id',
    user_id: { type: 'integer', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    maintenance_ticket_id: { type: 'integer', notNull: true, references: 'maintenance_tickets(id)', onDelete: 'CASCADE' },
    created_at: { type: 'varchar(50)', notNull: true },
    updated_at: { type: 'varchar(50)', notNull: true },
  });

  pgm.addConstraint(
    'assign_maintenance_tasks',
    'unique_user_ticket',
    'UNIQUE(user_id, maintenance_ticket_id)'
  );
};

exports.down = (pgm) => {
  pgm.dropTable('assign_maintenance_tasks');
};
