CREATE TABLE IF NOT EXISTS user (
    user_id SERIAL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email UNIQUE TEXT NOT NULL,
    active BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY (user_id)
);
