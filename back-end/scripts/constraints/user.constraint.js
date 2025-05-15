export default [
    `
    CREATE CONSTRAINT user_id_unique IF NOT EXISTS
    FOR (u:User)
    REQUIRE u.id IS UNIQUE
    `,
    `
    CREATE CONSTRAINT user_email_unique IF NOT EXISTS
    FOR (u:User)
    REQUIRE u.email IS UNIQUE
    `
]