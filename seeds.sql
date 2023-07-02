INSERT INTO department (dept_name)
VALUES 
('Medical Services Department'),
('Administrative Department'),
('Laboratory Department');
('Research and Development Department')


INSERT INTO job (title, salary, department_id)
VALUES 
('Medical Office Manager', 80000, 1),
('Meidcal Billing Specialist', 55000, 1),
('Medical Records Coordinator', 40000, 1),
('Office Administrato', 300000, 2),
('Insurance coordinator', 60000, 2),
('Front Desk Receptionist', 35000, 2),
('Laboratory Manager', 85000, 3);
('Laboratory Technician Supervisor', 65000, 3);
('Laboratory Assistant', 75000, 3);
('Research Coordinator', 85000, 4);
('Clinical Trials Administrator', 65000, 4);
('Grants Coordinator', 55000, 4);




INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES 
('John', 'Smith', 1, NULL), -- Medical Office Manager
('Emily', 'Johnson', 2, 1), -- Medical Billing Specialist
('Michael', 'Williams', 3, 1), -- Medical Records Coordinator
('Jessica', 'Brown', 4, 2), -- Office Administrator
('David', 'Taylor', 5, 2), -- Insurance Coordinator
('Sarah', 'Davis', 6, 2), -- Front Desk Receptionist
('Robert', 'Miller', 7, 3), -- Laboratory Manager
('Jennifer', 'Anderson', 8, 3), -- Laboratory Technician Supervisor
('Daniel', 'Martinez', 9, 3), -- Laboratory Assistant
('Michelle', 'Garcia', 10, 4), -- Research Coordinator
('Christopher', 'Lopez', 11, 4), -- Clinical Trials Administrator
('Laura', 'Hernandez', 12, 4); -- Grants Coordinator