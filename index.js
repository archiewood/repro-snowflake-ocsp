const snowflake = require('snowflake-sdk');

// Connection configuration
const config = {
    account: '<your_account>',
    username: '<your_username>',
    password: '<your_password>',
    warehouse: '<your_warehouse>',
    database: '<your_database>',
    schema: '<your_schema>'
};

// Create connection
const connection = snowflake.createConnection(config);

// Connect to Snowflake
connection.connect((err, conn) => {
    if (err) {
        console.error('Unable to connect: ' + err.message);
    } else {
        console.log('Successfully connected to Snowflake.');
        // Execute a sample query
        const query = `
        SELECT CURRENT_VERSION();
        WITH RECURSIVE generate_series(n) AS (
            SELECT 1
            UNION ALL
            SELECT n + 1
            FROM generate_series
            WHERE n < 3000000
        )
        SELECT 
            n AS id,
            RANDSTR(10, RANDOM()) AS random_string,
            UNIFORM(1, 100, RANDOM()) AS random_number,
            DATEADD(day, UNIFORM(0, 3650, RANDOM()), CURRENT_DATE()) AS random_date
        FROM generate_series
        `;
        
        connection.execute({
            sqlText: query,
            complete: (err, stmt, rows) => {
                if (err) {
                    console.error('Failed to execute statement due to the following error: ' + err.message);
                } else {
                    console.log('Successfully executed statement: ' + stmt.getSqlText());
                    console.log(rows);
                }
                // Close the connection
                connection.destroy((err) => {
                    if (err) {
                        console.error('Unable to disconnect: ' + err.message);
                    } else {
                        console.log('Disconnected connection');
                    }
                });
            }
        });
    }
});