from .db import db, environment, SCHEMA, add_prefix_for_prod

user_servers = db.Table(
    "user_servers",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "server_id",
        db.Integer,
        db.ForeignKey("servers.id"),
        primary_key=True
    ),
)
