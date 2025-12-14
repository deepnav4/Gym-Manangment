# Entity-Relationship Diagrams
## Social Media Database Management System

---

## 1. COMPLETE ER DIAGRAM

```
                         ┌─────────────┐
                         │   user_id   │
                         │   username  │
                         │    email    │
        ┌────────────────│   password  │────────────────┐
        │                │  full_name  │                │
        │                │     bio     │                │
        │                │profile_pic  │                │
        │                │ created_at  │                │
        │                └──────┬──────┘                │
        │                       │                       │
        │                    USERS                      │
        │                       │                       │
        │                       │1                      │
        │          ┌────────────┼────────────┐          │
        │          │            │            │          │
        │          │            │            │          │
        │       Creates      Creates      Sends        │
        │        Posts        Likes      Messages      │
        │          │            │            │          │
        │          │N           │N           │N         │
        │          │            │            │          │
   ┌────▼────┐ ┌──▼────┐   ┌───▼───┐   ┌────▼────┐    │
   │post_id  │ │like_id│   │msg_id │   │follower │    │
   │user_id  │ │post_id│   │sender │   │  _id    │    │
   │content  │ │user_id│   │receiver   │user_id  │    │
   │image_url│ │created│   │content│   │follower │    │
   │likes_   │ │  _at  │   │is_read│   │ _user_id│◄───┘
   │ count   │ └───────┘   │created│   │created  │
   │comments_│             │  _at  │   │  _at    │
   │ count   │             └───────┘   └─────────┘
   │created  │              MESSAGES    FOLLOWERS
   │  _at    │
   └────┬────┘
      POSTS
        │
        │1
        │
        │ Has
        │
        │N
        │
   ┌────▼─────┐
   │comment_id│
   │ post_id  │
   │ user_id  │
   │ content  │
   │created_at│
   └──────────┘
    COMMENTS
```

---

## 2. DETAILED ER DIAGRAM WITH ATTRIBUTES

### Entity: USERS
```
┌─────────────────────────────────────┐
│            USERS                     │
├─────────────────────────────────────┤
│ PK: user_id (UUID)                  │
│                                      │
│ • username (VARCHAR) [UNIQUE]       │
│ • email (VARCHAR) [UNIQUE]          │
│ • password (VARCHAR) [HASHED]       │
│ • full_name (VARCHAR)               │
│ • bio (TEXT)                         │
│ • profile_picture (VARCHAR)         │
│ • created_at (TIMESTAMP)            │
│ • updated_at (TIMESTAMP)            │
└─────────────────────────────────────┘
```

### Entity: POSTS
```
┌─────────────────────────────────────┐
│            POSTS                     │
├─────────────────────────────────────┤
│ PK: post_id (UUID)                  │
│ FK: user_id → USERS                 │
│                                      │
│ • content (TEXT)                     │
│ • image_url (VARCHAR)               │
│ • likes_count (INTEGER) DEFAULT 0   │
│ • comments_count (INTEGER) DEFAULT 0│
│ • created_at (TIMESTAMP)            │
│ • updated_at (TIMESTAMP)            │
└─────────────────────────────────────┘
```

### Entity: COMMENTS
```
┌─────────────────────────────────────┐
│          COMMENTS                    │
├─────────────────────────────────────┤
│ PK: comment_id (UUID)               │
│ FK: post_id → POSTS                 │
│ FK: user_id → USERS                 │
│                                      │
│ • content (TEXT)                     │
│ • created_at (TIMESTAMP)            │
└─────────────────────────────────────┘
```

### Entity: LIKES
```
┌─────────────────────────────────────┐
│            LIKES                     │
├─────────────────────────────────────┤
│ PK: like_id (UUID)                  │
│ FK: post_id → POSTS                 │
│ FK: user_id → USERS                 │
│                                      │
│ • created_at (TIMESTAMP)            │
│                                      │
│ UNIQUE: (user_id, post_id)          │
└─────────────────────────────────────┘
```

### Entity: FOLLOWERS
```
┌─────────────────────────────────────┐
│          FOLLOWERS                   │
├─────────────────────────────────────┤
│ PK: follower_id (UUID)              │
│ FK: user_id → USERS (followed)      │
│ FK: follower_user_id → USERS        │
│                                      │
│ • created_at (TIMESTAMP)            │
│                                      │
│ UNIQUE: (user_id, follower_user_id) │
└─────────────────────────────────────┘
```

### Entity: MESSAGES
```
┌─────────────────────────────────────┐
│          MESSAGES                    │
├─────────────────────────────────────┤
│ PK: message_id (UUID)               │
│ FK: sender_id → USERS               │
│ FK: receiver_id → USERS             │
│                                      │
│ • content (TEXT)                     │
│ • is_read (BOOLEAN) DEFAULT false   │
│ • created_at (TIMESTAMP)            │
└─────────────────────────────────────┘
```

---

## 3. RELATIONSHIPS SUMMARY

### One-to-Many Relationships
- **USERS** → **POSTS** (One user creates many posts)
- **USERS** → **COMMENTS** (One user writes many comments)
- **POSTS** → **COMMENTS** (One post has many comments)

### Many-to-Many Relationships
- **USERS** ←→ **USERS** (via FOLLOWERS) - Users follow other users
- **USERS** ←→ **POSTS** (via LIKES) - Users like many posts
- **USERS** ←→ **USERS** (via MESSAGES) - Users send messages to each other

---

## 4. SIMPLE CARDINALITY DIAGRAM

```
USERS (1) ──────── (M) POSTS
  │                    │
  │                    └─── (M) COMMENTS
  │                    │
  │                    └─── (M) LIKES
  │
  ├───────── (M) COMMENTS
  │
  ├───────── (M) LIKES
  │
  ├───────── (M) FOLLOWERS (as follower)
  │
  ├───────── (M) FOLLOWERS (as followed)
  │
  └───────── (M) MESSAGES (as sender/receiver)
```

---

## 5. KEY CONSTRAINTS

### Business Rules:
1. Users cannot follow themselves
2. Users cannot like the same post twice
3. Email and username must be unique
4. All passwords must be hashed

### Data Integrity:
- Foreign keys have CASCADE DELETE
- Timestamps auto-populate
- Unique constraints on (user_id, post_id) for likes
- Unique constraints on (user_id, follower_user_id) for followers

---

**Document Created**: 2025-11-26  
**Version**: 1.0  
**Database**: Social Media Management System
