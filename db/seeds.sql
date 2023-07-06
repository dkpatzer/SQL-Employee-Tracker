-- Insert department data
INSERT INTO department (name) VALUES
  ('Medical Services Department'),
  ('Administrative Department'),
  ('Laboratory Department'),
  ('Research and Development Department');

-- Insert role data
INSERT INTO role (title, salary, department_id) VALUES
  ('Medical Office Manager', 80000.00, 1),
  ('Medical Billing Specialist', 55000.00, 1),
  ('Medical Records Coordinator', 40000.00, 1),
  ('Office Administrator', 300000.00, 2),
  ('Insurance Coordinator', 60000.00, 2),
  ('Front Desk Receptionist', 35000.00, 2),
  ('Laboratory Manager', 85000.00, 3),
  ('Laboratory Technician Supervisor', 65000.00, 3),
  ('Laboratory Assistant', 75000.00, 3),
  ('Research Coordinator', 85000.00, 4),
  ('Clinical Trials Administrator', 65000.00, 4),
  ('Grants Coordinator', 55000.00, 4);

-- Insert employee data
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Smith', 1, NULL), -- Medical Office Manager
  ('Emily', 'Johnson', 2, 1), -- Medical Billing Specialist with manager ID 1
  ('Michael', 'Williams', 3, 1), -- Medical Records Coordinator with manager ID 1
  ('Jessica', 'Brown', 4, NULL), -- Office Administrator with manager ID 4
  ('David', 'Taylor', 5, 4), -- Insurance Coordinator with manager ID 4
  ('Sarah', 'Davis', 6, 4), -- Front Desk Receptionist with manager ID 4
  ('Robert', 'Miller', 7, 7), -- Laboratory Manager with manager ID 7
  ('Jennifer', 'Anderson', 8, 7), -- Laboratory Technician Supervisor with manager ID 7
  ('Daniel', 'Martinez', 9, 7), -- Laboratory Assistant with manager ID 7
  ('Michelle', 'Garcia', 10, NULL), -- Research Coordinator with manager ID 10
  ('Christopher', 'Lopez', 11, 10), -- Clinical Trials Administrator with manager ID 10
  ('Laura', 'Hernandez', 12, 10); -- Grants Coordinator with manager ID 10



