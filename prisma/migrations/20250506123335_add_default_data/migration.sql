-- Create default barber user
INSERT INTO "User" ("id", "firstName", "lastName", "phone_number", "role", "created_at", "updated_at")
VALUES (
    'clg1234567890',
    'John',
    'Smith',
    '1234567890',
    'BARBER',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Create default barber profile
INSERT INTO "Barber" (
    "id",
    "firstName",
    "lastName",
    "phone_number",
    "specialties",
    "working_hours",
    "bio",
    "created_at",
    "updated_at"
)
VALUES (
    'clg1234567890',
    'John',
    'Smith',
    '+1234567890',
    ARRAY['Classic Cuts', 'Beard Trimming', 'Hair Coloring'],
    '{"monday": {"start": "09:00", "end": "17:00"}, "tuesday": {"start": "09:00", "end": "17:00"}, "wednesday": {"start": "09:00", "end": "17:00"}, "thursday": {"start": "09:00", "end": "17:00"}, "friday": {"start": "09:00", "end": "17:00"}}',
    'Professional barber with 10 years of experience in classic and modern cuts.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Create default services
INSERT INTO "Service" ("id", "name", "description", "duration_minutes", "price", "created_at", "updated_at")
VALUES
    ('clg1111111111', 'Classic Haircut', 'Traditional men''s haircut with scissors and clippers', 30, 25.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('clg2222222222', 'Beard Trim', 'Professional beard shaping and trimming', 20, 15.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('clg3333333333', 'Hair Coloring', 'Professional hair coloring service', 60, 45.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('clg4444444444', 'Kids Haircut', 'Haircut for children under 12', 20, 15.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('clg5555555555', 'Hair Wash & Style', 'Complete hair wash and styling service', 40, 30.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 