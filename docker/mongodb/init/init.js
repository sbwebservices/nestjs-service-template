print('########## Creating users');

db.auth('root', 'root');

db = db.getSiblingDB('spreadsheets');

db.createUser({
  user: 'local',
  pwd: '%D%cf%QS*#D%W',
  roles: [
    {
      role: 'readWrite',
      db: 'spreadsheets',
    },
  ],
});

print('########## Done');
