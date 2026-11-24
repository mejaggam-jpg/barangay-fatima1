CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  name TEXT NOT NULL,
  "citizenId" BIGINT
);

CREATE TABLE IF NOT EXISTS officials (
  id BIGINT PRIMARY KEY,
  position TEXT NOT NULL,
  prefix TEXT DEFAULT '',
  fname TEXT NOT NULL,
  mname TEXT DEFAULT '',
  lname TEXT NOT NULL,
  suffix TEXT DEFAULT '',
  "contactNo" TEXT DEFAULT '',
  address TEXT DEFAULT 'Barangay Fatima I, Dasmarinas, Cavite',
  "startOfTerm" TEXT DEFAULT '',
  "endOfTerm" TEXT DEFAULT '',
  "isOther" BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS citizens (
  id BIGINT PRIMARY KEY,
  fname TEXT NOT NULL,
  mname TEXT DEFAULT '',
  lname TEXT NOT NULL,
  "placeOfBirth" TEXT DEFAULT '',
  birthdate TEXT DEFAULT '',
  gender TEXT DEFAULT 'Male',
  "contactNo" TEXT DEFAULT '',
  occupation TEXT DEFAULT '',
  citizenship TEXT DEFAULT 'Filipino',
  "civilStatus" TEXT DEFAULT 'Single',
  "nationalID" TEXT DEFAULT '',
  "voterStatus" TEXT DEFAULT 'Voter',
  email TEXT DEFAULT '',
  address TEXT DEFAULT 'Barangay Fatima I, Dasmarinas, Cavite',
  blk TEXT DEFAULT '',
  lot TEXT DEFAULT '',
  subdivision TEXT DEFAULT '',
  purok TEXT DEFAULT 'Fatima 1',
  precinct TEXT DEFAULT '',
  "householdNo" TEXT DEFAULT '',
  rentee TEXT DEFAULT 'No',
  "fourPs" TEXT DEFAULT 'No',
  "residencyType" TEXT DEFAULT 'Resident',
  "memberSince" TEXT DEFAULT '',
  pwd TEXT DEFAULT 'No',
  archived BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS blotters (
  id BIGINT PRIMARY KEY,
  "caseNo" TEXT NOT NULL,
  "dateIssued" TEXT DEFAULT '',
  "complainantFname" TEXT NOT NULL,
  "complainantLname" TEXT NOT NULL,
  "complaineeFname" TEXT NOT NULL,
  "complaineeLname" TEXT NOT NULL,
  "hearingStage" TEXT DEFAULT '1st Hearing',
  "hearingDate" TEXT DEFAULT '',
  description TEXT DEFAULT '',
  resolved BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS requests (
  id BIGINT PRIMARY KEY,
  fname TEXT NOT NULL,
  lname TEXT NOT NULL,
  "contactNo" TEXT DEFAULT '',
  "dateIssued" TEXT DEFAULT '',
  category TEXT DEFAULT 'Document Request',
  request TEXT NOT NULL,
  description TEXT DEFAULT '',
  resolved BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS announcements (
  id BIGINT PRIMARY KEY,
  date TEXT DEFAULT '',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  "recipientCount" INTEGER DEFAULT 0
);

ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE officials DISABLE ROW LEVEL SECURITY;
ALTER TABLE citizens DISABLE ROW LEVEL SECURITY;
ALTER TABLE blotters DISABLE ROW LEVEL SECURITY;
ALTER TABLE requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE announcements DISABLE ROW LEVEL SECURITY;

-- Set all existing records to Fatima 1 / Barangay Fatima I
UPDATE citizens SET purok = 'Fatima 1', address = 'Barangay Fatima I, Dasmarinas, Cavite';
UPDATE officials SET address = 'Barangay Fatima I, Dasmarinas, Cavite';
