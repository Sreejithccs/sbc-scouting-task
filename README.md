# Startupbootcamp Australia Scouting Task

## Task 1. NextJS

Clone this repository locally
```bash
git clone https://github.com/sbcaus/sbc-scouting-task.git
```
install dependencies
```bash
npm install
```
to get started
```bash
npm run dev
```

You should see a table displaying 100 startups along with some basic information

### Your task
To create a modal that will open when a row is doubled clicked

The popup modal should have the following features:

- startup details (id, name, description, categories)
- textfield/dropdown to make changes (they should be prefilled with the startup details)
- output the updated payload when the modal is saved/updated (via a button)

_You may use any libraries you wish to achieve this_

## Task 2. SQL

### Your task
To return the companies with all their tags, showing the highest rated companies first

_You can use [sqlfiddle](http://sqlfiddle.com/) and select `PostgreSQL 9.6` from the dropdown and paste the following snippet to build the schema_

```sql
CREATE TABLE company (
  id int8 PRIMARY KEY,
  name text UNIQUE NOT NULL
 );

 INSERT INTO company (id, name)
 VALUES
  (1, 'Google'),
  (2, 'Amazon'),
  (3, 'Meta'),
  (4, 'Microsoft'),
  (5, 'Netflix');

CREATE TABLE review (
  cohort text NOT NULL,
  company_id int8 NOT NULL,
  rating int4,
  PRIMARY KEY (cohort, company_id),
  FOREIGN KEY (company_id) REFERENCES company (id)
);

INSERT INTO review (cohort, company_id, rating)
VALUES
  ('FT22', 1, 2),
  ('SE22', 1, 1),
  ('FT22', 2, 3),
  ('SE22', 2, 4),
  ('SE22', 3, 4),
  ('FT22', 4, 4),
  ('SE22', 5, 2),
  ('FT22', 5, 2);

CREATE TABLE tag (
  id int8 PRIMARY KEY,
  name text UNIQUE NOT NULL
);

INSERT INTO tag (id, name)
VALUES
  (1, 'Technology'),
  (2, 'Infrastructure'),
  (3, 'Internet'),
  (4, 'Artificial Intelligence'),
  (5, 'Cloud Computing');

CREATE TABLE tag_on_company (
  company_id int8,
  tag_id int8,
  PRIMARY KEY (company_id, tag_id),
  FOREIGN KEY (company_id) REFERENCES company (id),
  FOREIGN KEY (tag_id) REFERENCES tag (id)
);

INSERT INTO tag_on_company (company_id, tag_id)
VALUES
  (1, 2),
  (1, 3),
  (1, 4),
  (3, 4),
  (3, 5),
  (4, 1),
  (4, 2),
  (4, 3),
  (5, 2),
  (5, 5);
```

The expected output is

```markdown
| id  | name      | rating | tags                                            |
| --- | --------- | ------ | ----------------------------------------------- |
| 4   | Microsoft | 4      | Technology,Infrastructure,Internet              |
| 2   | Amazon    | 3      |                                                 |
| 1   | Google    | 2      | Infrastructure,Internet,Artificial Intelligence |
| 5   | Netflix   | 2      | Infrastructure,Cloud Computing                  |
```

## Task 3. Submission
Once you have completed both tasks, copy your SQL code from Task 2 into `task2.sql`

Remove the existing origin
```bash
git remote remove origin
```
Create a new repository on your own account
```bash
git remote add origin https://github.com/[your_github_username]/[your_repo_name].git
```
Commit and push your changes
```bash
git commit -m "submission"
git push -u origin main
```

Finally share the link to your submission
