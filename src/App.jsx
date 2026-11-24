import React, { useState, useEffect } from 'react';
import barangaySeal from './assets/barangay-seal.jpg';
import barangayBanner from './assets/barangay-banner.jpg';
import { SEAL_DATA_URL } from './assets/docImages.js';
import { supabase } from './supabaseClient.js';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserMinus,
  ShieldAlert,
  FileText,
  FileCheck,
  MessageSquare,
  UserPlus,
  KeyRound,
  LogOut,
  Search,
  Plus,
  Edit3,
  Eye,
  Archive,
  RotateCcw,
  Trash2,
  CheckCircle2,
  Printer,
  Download,
  Upload,
  Send,
  Menu,
  X,
  ChevronDown,
  AlertTriangle,
  Building2,
  Accessibility,
  ClipboardList,
  RefreshCw,
  Megaphone,
  User,
  Home,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const STORAGE_KEY = 'barangay_fatima1_bims_v4';

const defaultUsers = [
  { id: 1, username: 'admin', password: 'password123', role: 'admin', name: 'Mr. Agustine (Admin)', citizenId: null },
  { id: 2, username: 'secretary', password: 'password123', role: 'Secretary', name: 'Secretary', citizenId: null },
  { id: 3, username: 'citizen', password: 'password123', role: 'Citizen', name: 'Angelica Puray', citizenId: 1 },
];

const defaultOfficials = [
  { id: 1, position: 'Captain', prefix: '', fname: 'Garyy', mname: 'N.', lname: 'Esteban', suffix: '', contactNo: '09123451234', address: 'Barangay Fatima I, Dasmarinas, Cavite', startOfTerm: '2023-11-01', endOfTerm: '2026-11-01', isOther: false, archived: false },
  { id: 2, position: 'Cooperative, Livelihood Public Works, Infrastructure', prefix: '', fname: 'Roberto', mname: 'S.', lname: 'Antonio', suffix: '', contactNo: '09123451239', address: 'Barangay Fatima I, Dasmarinas, Cavite', startOfTerm: '2023-11-01', endOfTerm: '2026-11-01', isOther: false, archived: false },
  { id: 3, position: 'Education, Culture and Social Welfare', prefix: '', fname: 'Janzel Jhae', mname: 'B.', lname: 'Amoroso', suffix: '', contactNo: '09123451245', address: 'Barangay Fatima I, Dasmarinas, Cavite', startOfTerm: '2023-11-01', endOfTerm: '2026-11-01', isOther: false, archived: false },
  { id: 4, position: 'Environmental Protection', prefix: '', fname: 'Andy', mname: 'G.', lname: 'Vicente', suffix: '', contactNo: '09123451235', address: 'Barangay Fatima I, Dasmarinas, Cavite', startOfTerm: '2023-11-01', endOfTerm: '2026-11-01', isOther: false, archived: false },
  { id: 5, position: 'Housing, Utilize Public Utilities and Facilities', prefix: '', fname: 'Eric', mname: 'T.', lname: 'Tayo', suffix: '', contactNo: '09123451236', address: 'Barangay Fatima I, Dasmarinas, Cavite', startOfTerm: '2023-11-01', endOfTerm: '2026-11-01', isOther: false, archived: false },
  { id: 6, position: 'Human Rights Peace and Order Public Safety', prefix: '', fname: 'Ulysses', mname: 'C.', lname: 'Cypress', suffix: '', contactNo: '09123451237', address: 'Barangay Fatima I, Dasmarinas, Cavite', startOfTerm: '2023-11-01', endOfTerm: '2026-11-01', isOther: false, archived: false },
  { id: 7, position: 'Secretary', prefix: '', fname: 'Cerenia', mname: 'A.', lname: 'Coladilla', suffix: '', contactNo: '09123451240', address: 'Barangay Fatima I, Dasmarinas, Cavite', startOfTerm: '2023-11-01', endOfTerm: '2026-11-01', isOther: false, archived: false },
  { id: 8, position: 'Treasurer', prefix: '', fname: 'Olivia', mname: 'L.', lname: 'Eduarte', suffix: '', contactNo: '09123451241', address: 'Barangay Fatima I, Dasmarinas, Cavite', startOfTerm: '2023-11-01', endOfTerm: '2026-11-01', isOther: false, archived: false },
  { id: 9, position: 'Women and Family', prefix: '', fname: 'Reiiel Agustine', mname: '', lname: 'Sagay', suffix: '', contactNo: '09123456789', address: 'Barangay Fatima I, Dasmarinas, Cavite', startOfTerm: '2023-11-01', endOfTerm: '2026-11-01', isOther: false, archived: false },
  { id: 10, position: 'Youth and Sports Development', prefix: '', fname: 'Ace', mname: '', lname: 'Liwanag', suffix: '', contactNo: '09123451242', address: 'Barangay Fatima I, Dasmarinas, Cavite', startOfTerm: '2023-11-01', endOfTerm: '2026-11-01', isOther: false, archived: false },
];

const defaultCitizens = [
  { id: 1, fname: 'Angelica', mname: 'S.', lname: 'Puray', placeOfBirth: 'Dasmarinas, Cavite', birthdate: '2001-10-03', gender: 'Female', contactNo: '09123456789', occupation: 'Clerk', citizenship: 'Filipino', civilStatus: 'Married', nationalID: '123456', voterStatus: 'Voter', email: 'angelica@example.com', address: 'Barangay Fatima I, Dasmarinas, Cavite', blk: 'Blk 1', lot: 'Lot 1', subdivision: 'Phase 1 Windward Hills Subdivision', purok: 'Fatima 1', precinct: '0042A', householdNo: 'HH-001', rentee: 'No', fourPs: 'No', residencyType: 'Resident', memberSince: '2018-05-01', pwd: 'No', archived: false },
  { id: 2, fname: 'Jem Jinell', mname: 'L.', lname: 'Maggay', placeOfBirth: 'Dasmarinas, Cavite', birthdate: '2001-09-10', gender: 'Male', contactNo: '09123456789', occupation: 'IT Specialist', citizenship: 'Filipino', civilStatus: 'Single', nationalID: '123457', voterStatus: 'Voter', email: 'jem@example.com', address: 'Barangay Fatima I, Dasmarinas, Cavite', blk: 'Blk 1', lot: 'Lot 2', subdivision: 'Phase 1 Windward Hills Subdivision', purok: 'Fatima 1', precinct: '0042A', householdNo: 'HH-002', rentee: 'No', fourPs: 'No', residencyType: 'Resident', memberSince: '2019-03-15', pwd: 'No', archived: false },
  { id: 3, fname: 'Julianne', mname: 'B.', lname: 'Dela Cruz', placeOfBirth: 'Imus, Cavite', birthdate: '2003-11-15', gender: 'Female', contactNo: '09123456789', occupation: 'Student', citizenship: 'Filipino', civilStatus: 'Married', nationalID: '123458', voterStatus: 'Non-Voter', email: 'julianne@example.com', address: 'Barangay Fatima I, Dasmarinas, Cavite', blk: 'Blk 2', lot: 'Lot 5', subdivision: 'Fatima I Proper', purok: 'Fatima 1', precinct: '0043B', householdNo: 'HH-003', rentee: 'Yes', fourPs: 'No', residencyType: 'Resident', memberSince: '2020-06-10', pwd: 'Yes', archived: false },
  { id: 4, fname: 'Reiiel Agustine', mname: 'R.', lname: 'Sagay', placeOfBirth: 'Dasmarinas, Cavite', birthdate: '2001-08-30', gender: 'Male', contactNo: '09123456789', occupation: 'Student', citizenship: 'Filipino', civilStatus: 'Single', nationalID: '123459', voterStatus: 'Voter', email: 'reiiel@example.com', address: 'Barangay Fatima I, Dasmarinas, Cavite', blk: 'Blk 1', lot: 'Lot 1', subdivision: 'Fatima I Proper', purok: 'Fatima 1', precinct: '0042A', householdNo: 'HH-004', rentee: 'No', fourPs: 'No', residencyType: 'Resident', memberSince: '2021-05-01', pwd: 'Yes', archived: false },
  { id: 5, fname: 'Carlos', mname: 'R.', lname: 'Alvarez', placeOfBirth: 'Bacoor, Cavite', birthdate: '1960-02-18', gender: 'Male', contactNo: '09183334455', occupation: 'Retired Mechanic', citizenship: 'Filipino', civilStatus: 'Married', nationalID: '123460', voterStatus: 'Voter', email: 'carlos@example.com', address: 'Barangay Fatima I, Dasmarinas, Cavite', blk: 'Blk 4', lot: 'Lot 9', subdivision: 'Fatima I Proper', purok: 'Fatima 1', precinct: '0044A', householdNo: 'HH-005', rentee: 'No', fourPs: 'Yes', residencyType: 'Resident', memberSince: '2005-01-10', pwd: 'No', archived: false },
  { id: 6, fname: 'Mark', mname: 'T.', lname: 'Aquino', placeOfBirth: 'Manila', birthdate: '1993-07-12', gender: 'Male', contactNo: '09185556677', occupation: 'Delivery Rider', citizenship: 'Filipino', civilStatus: 'Single', nationalID: '123461', voterStatus: 'Non-Voter', email: 'mark@example.com', address: 'Barangay Fatima I, Dasmarinas, Cavite', blk: 'Blk 8', lot: 'Lot 3', subdivision: 'Outside Barangay', purok: 'Fatima 1', precinct: 'N/A', householdNo: 'NR-001', rentee: 'Yes', fourPs: 'No', residencyType: 'Non-Resident', memberSince: '2025-02-01', pwd: 'No', archived: false },
];

const defaultBlotters = [
  { id: 1, caseNo: '1', dateIssued: '2026-11-10', complainantFname: 'Reiiel', complainantLname: 'Sagay', complaineeFname: 'Mark', complaineeLname: 'Aquino', hearingStage: '1st Hearing', hearingDate: '2026-11-28', description: 'Noise complaint and parking obstruction along Blk 8 alley.', resolved: false },
  { id: 2, caseNo: '2', dateIssued: '2026-10-18', complainantFname: 'Angelica', complainantLname: 'Puray', complaineeFname: 'Edgar', complaineeLname: 'Pineda', hearingStage: 'Settled', hearingDate: '2026-10-25', description: 'Boundary fence disagreement amicably settled.', resolved: true },
];

const defaultRequests = [
  { id: 1, fname: 'Angelica', lname: 'Puray', contactNo: '09123456789', dateIssued: '2026-11-22', category: 'Document Request', request: 'Barangay Clearance', description: 'Needed for local employment.', resolved: false },
  { id: 2, fname: 'Carlos', lname: 'Alvarez', contactNo: '09183334455', dateIssued: '2026-11-23', category: 'Barangay Property', request: 'Basketball Court Reservation', description: 'Youth league practice on Saturday afternoon.', resolved: false },
  { id: 3, fname: 'Julianne', lname: 'Dela Cruz', contactNo: '09123456789', dateIssued: '2026-11-12', category: 'Document Request', request: 'Certificate of Indigency', description: 'For scholarship application.', resolved: true },
];

const defaultSmsLogs = [
  { id: 1, date: '2026-11-20 09:30', title: 'Community Clean-Up Drive', message: 'Barangay Fatima I clean-up drive this Saturday at 7:00 AM. Assembly at the Barangay Hall.', recipientCount: 6 },
  { id: 2, date: '2026-11-18 14:15', title: 'Road Maintenance Advisory', message: 'Minor road repair along Fatima 1 main street from 8:00 AM to 4:00 PM tomorrow.', recipientCount: 6 },
];

const FIXED_ADDRESS = 'Barangay Fatima I, Dasmarinas, Cavite';
const FIXED_PUROK = 'Fatima 1';
const fixCitizen = (c) => ({ ...c, purok: FIXED_PUROK, address: FIXED_ADDRESS });
const fixOfficial = (o) => ({ ...o, address: FIXED_ADDRESS });

function getSavedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.citizens) data.citizens = data.citizens.map(fixCitizen);
      if (data.officials) data.officials = data.officials.map(fixOfficial);
      return data;
    }
  } catch (err) {
    return null;
  }
  return null;
}

function getAge(birthdate) {
  if (!birthdate) return 0;
  const today = new Date();
  const dob = new Date(birthdate);
  if (isNaN(dob.getTime())) return 0;
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age < 0 ? 0 : age;
}

function getFullName(person) {
  const parts = [];
  if (person.prefix) parts.push(person.prefix + '.');
  if (person.fname) parts.push(person.fname);
  if (person.mname) parts.push(person.mname);
  if (person.lname) parts.push(person.lname);
  if (person.suffix) parts.push(person.suffix);
  return parts.join(' ');
}

async function syncTableToSupabase(table, rows) {
  if (!supabase) return;
  try {
    const { data: existing } = await supabase.from(table).select('id');
    const keepIds = new Set(rows.map((r) => r.id));
    if (rows.length > 0) {
      await supabase.from(table).upsert(rows, { onConflict: 'id' });
    }
    if (existing && existing.length > 0) {
      const toDelete = existing.map((e) => e.id).filter((id) => !keepIds.has(id));
      if (toDelete.length > 0) {
        await supabase.from(table).delete().in('id', toDelete);
      }
    }
  } catch (err) {
    return;
  }
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadWordDoc(filename, htmlBody) {
  const docHtml =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
    '<head><meta charset="utf-8"><title>' + filename + '</title>' +
    '<style>@page { size: 8.5in 11in; margin: 0.6in; } body { font-family: Georgia, serif; color: #111; font-size: 11pt; }</style>' +
    '</head><body>' + htmlBody + '</body></html>';
  downloadFile(filename, docHtml, 'application/msword');
}

function printDocumentHtml(title, htmlBody) {
  const frame = document.createElement('iframe');
  frame.style.position = 'fixed';
  frame.style.right = '0';
  frame.style.bottom = '0';
  frame.style.width = '0';
  frame.style.height = '0';
  frame.style.border = '0';
  document.body.appendChild(frame);
  const doc = frame.contentWindow.document;
  doc.open();
  doc.write(
    '<!doctype html><html><head><meta charset="utf-8"><title>' + title + '</title>' +
    '<style>@page { size: letter; margin: 0.5in; } body { font-family: Georgia, serif; color: #111; margin: 0; font-size: 11pt; }</style>' +
    '</head><body>' + htmlBody + '</body></html>'
  );
  doc.close();
  setTimeout(() => {
    frame.contentWindow.focus();
    frame.contentWindow.print();
    setTimeout(() => {
      document.body.removeChild(frame);
    }, 1000);
  }, 250);
}

function buildCertificateHtml(docTitle, citizen, council, bodyParagraphs, purpose, secretaryName, captainName) {
  const issuedDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const councilHtml = council
    .map(
      (o) =>
        '<div style="margin-bottom:8px;"><div style="font-size:9pt;font-weight:bold;text-transform:uppercase;">' +
        getFullName(o) +
        '</div><div style="font-size:8pt;color:#475569;">' +
        o.position +
        '</div></div>'
    )
    .join('');

  return (
    '<div style="padding:24px;">' +
    '<table style="width:100%;border-bottom:2px solid #14532d;padding-bottom:10px;margin-bottom:16px;"><tr>' +
    '<td style="width:82px;vertical-align:middle;"><img src="' + SEAL_DATA_URL + '" width="72" height="72" style="border-radius:50%;" /></td>' +
    '<td style="text-align:center;vertical-align:middle;">' +
    '<div style="font-size:9pt;letter-spacing:1px;">REPUBLIC OF THE PHILIPPINES &bull; PROVINCE OF CAVITE</div>' +
    '<div style="font-size:15pt;font-weight:bold;color:#14532d;margin-top:3px;">CITY OF DASMARINAS - BARANGAY FATIMA I</div>' +
    '<div style="font-size:9pt;color:#475569;">Office of the Punong Barangay</div>' +
    '</td>' +
    '<td style="width:82px;"></td>' +
    '</tr></table>' +
    '<table style="width:100%;border-collapse:collapse;"><tr>' +
    '<td style="width:30%;vertical-align:top;border-right:1px solid #cbd5e1;padding-right:14px;">' +
    '<div style="font-size:9pt;font-weight:bold;color:#14532d;text-transform:uppercase;margin-bottom:10px;">BARANGAY COUNCIL</div>' +
    councilHtml +
    '</td>' +
    '<td style="width:70%;vertical-align:top;padding-left:18px;">' +
    '<h2 style="text-align:center;font-size:16pt;text-decoration:underline;margin:0 0 18px 0;">' + docTitle + '</h2>' +
    '<p style="font-weight:bold;margin-bottom:12px;">TO WHOM IT MAY CONCERN:</p>' +
    bodyParagraphs.map((p) => '<p style="line-height:1.6;text-indent:28px;margin-bottom:12px;">' + p + '</p>').join('') +
    '<p style="line-height:1.6;text-indent:28px;margin-bottom:12px;">This certification is being issued upon the request of the above-named person for the purpose of: <strong style="text-transform:uppercase;">' + purpose + '</strong>.</p>' +
    '<p style="line-height:1.6;text-indent:28px;margin-bottom:28px;">Issued this <strong>' + issuedDate + '</strong> at Barangay Fatima I, City of Dasmarinas, Cavite.</p>' +
    '<table style="width:100%;margin-top:28px;"><tr>' +
    '<td style="width:50%;vertical-align:top;"><div style="font-size:9pt;color:#475569;">Prepared by:</div><div style="font-weight:bold;text-transform:uppercase;margin-top:28px;">' + secretaryName + '</div><div style="font-size:9pt;">Barangay Secretary</div></td>' +
    '<td style="width:50%;vertical-align:top;"><div style="font-size:9pt;color:#475569;">Certified by:</div><div style="font-weight:bold;text-transform:uppercase;margin-top:28px;">' + captainName + '</div><div style="font-size:9pt;">Punong Barangay</div></td>' +
    '</tr></table>' +
    '<div style="margin-top:24px;padding-top:10px;border-top:1px solid #cbd5e1;font-size:8pt;color:#475569;">FREE OF CHARGE &nbsp;&bull;&nbsp; NOT VALID WITHOUT OFFICIAL SEAL</div>' +
    '</td></tr></table></div>'
  );
}

function buildCfaHtml(item, secretaryName, captainName) {
  const issuedDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    '<div style="padding:30px;">' +
    '<table style="width:100%;border-bottom:2px solid #1e293b;padding-bottom:12px;margin-bottom:20px;"><tr>' +
    '<td style="width:82px;vertical-align:middle;"><img src="' + SEAL_DATA_URL + '" width="72" height="72" style="border-radius:50%;" /></td>' +
    '<td style="text-align:center;vertical-align:middle;">' +
    '<div style="font-size:9pt;">REPUBLIC OF THE PHILIPPINES</div>' +
    '<div style="font-size:9pt;">PROVINCE OF CAVITE &bull; CITY OF DASMARINAS</div>' +
    '<div style="font-size:15pt;font-weight:bold;margin-top:4px;">BARANGAY FATIMA I</div>' +
    '<div style="font-size:9pt;font-style:italic;">Office of the Lupong Tagapamayapa</div>' +
    '</td>' +
    '<td style="width:82px;"></td>' +
    '</tr></table>' +
    '<h2 style="text-align:center;font-size:16pt;text-decoration:underline;margin-bottom:20px;">CERTIFICATE TO FILE ACTION</h2>' +
    '<p><strong>CASE NO.:</strong> ' + item.caseNo + '</p>' +
    '<p><strong>COMPLAINANT:</strong> ' + item.complainantFname + ' ' + item.complainantLname + '</p>' +
    '<p style="margin-bottom:18px;"><strong>COMPLAINEE:</strong> ' + item.complaineeFname + ' ' + item.complaineeLname + '</p>' +
    '<p style="font-weight:bold;">TO WHOM IT MAY CONCERN:</p>' +
    '<p style="line-height:1.6;text-indent:28px;">This is to certify that the case between <strong>' + item.complainantFname + ' ' + item.complainantLname + '</strong> and <strong>' + item.complaineeFname + ' ' + item.complaineeLname + '</strong> regarding &ldquo;' + item.description + '&rdquo; was not solved in our barangay. The complainant wants to endorse this case to the higher court.</p>' +
    '<p style="line-height:1.6;text-indent:28px;margin-bottom:36px;">This certificate to file action was done at Barangay Fatima I, Dasmarinas, Cavite this <strong>' + issuedDate + '</strong>.</p>' +
    '<table style="width:100%;margin-top:36px;text-align:center;"><tr>' +
    '<td style="width:50%;"><div style="border-top:1px solid #1e293b;display:inline-block;padding-top:4px;min-width:180px;font-weight:bold;text-transform:uppercase;">' + secretaryName + '</div><div style="font-size:9pt;">Barangay Secretary</div></td>' +
    '<td style="width:50%;"><div style="border-top:1px solid #1e293b;display:inline-block;padding-top:4px;min-width:180px;font-weight:bold;text-transform:uppercase;">' + captainName + '</div><div style="font-size:9pt;">Punong Barangay</div></td>' +
    '</tr></table></div>'
  );
}

function Modal({ open, title, onClose, children, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className={`w-full ${wide ? 'max-w-4xl' : 'max-w-2xl'} max-h-[90vh] flex flex-col rounded-xl bg-white shadow-xl border border-slate-200`}>
        <div className="flex items-center justify-between border-b border-slate-200 bg-green-900 text-white px-5 py-3.5 rounded-t-xl">
          <h3 className="text-base font-semibold">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-green-100 hover:bg-green-800">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  const saved = getSavedData();

  const [users, setUsersState] = useState(saved?.users || defaultUsers);
  const [officials, setOfficialsState] = useState(saved?.officials || defaultOfficials);
  const [citizens, setCitizensState] = useState(saved?.citizens || defaultCitizens);
  const [blotters, setBlottersState] = useState(saved?.blotters || defaultBlotters);
  const [requests, setRequestsState] = useState(saved?.requests || defaultRequests);
  const [smsLogs, setSmsLogsState] = useState(saved?.smsLogs || defaultSmsLogs);

  function setUsers(next) {
    setUsersState(next);
    syncTableToSupabase('users', next);
  }
  function setOfficials(next) {
    const fixed = next.map(fixOfficial);
    setOfficialsState(fixed);
    syncTableToSupabase('officials', fixed);
  }
  function setCitizens(next) {
    const fixed = next.map(fixCitizen);
    setCitizensState(fixed);
    syncTableToSupabase('citizens', fixed);
  }
  function setBlotters(next) {
    setBlottersState(next);
    syncTableToSupabase('blotters', next);
  }
  function setRequests(next) {
    setRequestsState(next);
    syncTableToSupabase('requests', next);
  }
  function setSmsLogs(next) {
    setSmsLogsState(next);
    syncTableToSupabase('announcements', next);
  }

  useEffect(() => {
    if (!supabase) return;
    async function loadFromDb() {
      try {
        const [uRes, oRes, cRes, bRes, rRes, aRes] = await Promise.all([
          supabase.from('users').select('*').order('id'),
          supabase.from('officials').select('*').order('id'),
          supabase.from('citizens').select('*').order('id', { ascending: false }),
          supabase.from('blotters').select('*').order('id', { ascending: false }),
          supabase.from('requests').select('*').order('id', { ascending: false }),
          supabase.from('announcements').select('*').order('id', { ascending: false }),
        ]);

        if (uRes.data && uRes.data.length > 0) setUsersState(uRes.data);
        else await supabase.from('users').upsert(defaultUsers);

        if (oRes.data && oRes.data.length > 0) setOfficialsState(oRes.data.map(fixOfficial));
        else await supabase.from('officials').upsert(defaultOfficials);

        if (cRes.data && cRes.data.length > 0) setCitizensState(cRes.data.map(fixCitizen));
        else await supabase.from('citizens').upsert(defaultCitizens);

        if (bRes.data && bRes.data.length > 0) setBlottersState(bRes.data);
        else await supabase.from('blotters').upsert(defaultBlotters);

        if (rRes.data && rRes.data.length > 0) setRequestsState(rRes.data);
        else await supabase.from('requests').upsert(defaultRequests);

        if (aRes.data && aRes.data.length > 0) setSmsLogsState(aRes.data);
        else await supabase.from('announcements').upsert(defaultSmsLogs);
      } catch (err) {
        return;
      }
    }
    loadFromDb();
  }, []);

  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [confirmBox, setConfirmBox] = useState(null);

  const [authMode, setAuthMode] = useState('login');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [regForm, setRegForm] = useState({
    fname: '',
    lname: '',
    contactNo: '',
    purok: 'Fatima 1',
    residencyType: 'Resident',
    username: '',
    password: '',
  });

  useEffect(() => {
    try {
      const payload = { users, officials, citizens, blotters, requests, smsLogs };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      return;
    }
  }, [users, officials, citizens, blotters, requests, smsLogs]);

  function notify(text, isError = false) {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), 3000);
  }

  function askConfirm(title, text, onYes, isDanger = false) {
    setConfirmBox({ title, text, onYes, isDanger });
  }

  function handleLogin(e) {
    e.preventDefault();
    const found = users.find(
      (u) => u.username.toLowerCase() === usernameInput.trim().toLowerCase() && u.password === passwordInput.trim()
    );
    if (!found) {
      setLoginError('Invalid username or password.');
      return;
    }
    setCurrentUser(found);
    setPage(found.role === 'Citizen' ? 'citizen-home' : 'dashboard');
    setLoginError('');
    setUsernameInput('');
    setPasswordInput('');
    notify('Welcome back, ' + found.name);
  }

  function handleRegister(e) {
    e.preventDefault();
    const uname = regForm.username.trim();
    if (users.some((u) => u.username.toLowerCase() === uname.toLowerCase())) {
      setLoginError('Username is already taken.');
      return;
    }
    if (regForm.password.length < 6) {
      setLoginError('Password must be at least 6 characters.');
      return;
    }
    const newCitizenId = Date.now();
    const newCitizen = {
      ...emptyCitizen,
      id: newCitizenId,
      fname: regForm.fname.trim(),
      lname: regForm.lname.trim(),
      contactNo: regForm.contactNo.trim(),
      purok: regForm.purok,
      residencyType: regForm.residencyType,
      birthdate: '2000-01-01',
      occupation: 'Resident',
      archived: false,
    };
    const newUser = {
      id: Date.now() + 1,
      username: uname,
      password: regForm.password,
      role: 'Citizen',
      name: regForm.fname.trim() + ' ' + regForm.lname.trim(),
      citizenId: newCitizenId,
    };
    setCitizens([newCitizen, ...citizens]);
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setPage('citizen-home');
    setLoginError('');
    setAuthMode('login');
    setRegForm({ fname: '', lname: '', contactNo: '', purok: 'Fatima 1', residencyType: 'Resident', username: '', password: '' });
    notify('Account registered! Welcome, ' + newUser.name);
  }

  function demoLogin(role) {
    const found = users.find((u) => u.role === role) || users[0];
    setCurrentUser(found);
    setPage(found.role === 'Citizen' ? 'citizen-home' : 'dashboard');
    setLoginError('');
    notify('Signed in as ' + found.name);
  }

  function handleLogout() {
    askConfirm('Logout', 'Proceed to logout?', () => {
      setCurrentUser(null);
      setDropdownOpen(false);
      setMenuOpen(false);
      notify('Logged out.');
    });
  }

  function handleResetData() {
    askConfirm('Reset Sample Data', 'Restore all default Barangay Fatima I records?', () => {
      setUsers(defaultUsers);
      setOfficials(defaultOfficials);
      setCitizens(defaultCitizens);
      setBlotters(defaultBlotters);
      setRequests(defaultRequests);
      setSmsLogs(defaultSmsLogs);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        return;
      }
      setDropdownOpen(false);
      notify('Sample data restored.');
    }, true);
  }

  function hasActiveBlotter(fname, lname) {
    const f = (fname || '').trim().toLowerCase();
    const l = (lname || '').trim().toLowerCase();
    return blotters.some(
      (b) => !b.resolved && b.complaineeFname.trim().toLowerCase() === f && b.complaineeLname.trim().toLowerCase() === l
    );
  }

  const activeCitizens = citizens.filter((c) => !c.archived);
  const stats = {
    population: activeCitizens.length,
    voters: activeCitizens.filter((c) => c.voterStatus === 'Voter').length,
    nonVoters: activeCitizens.filter((c) => c.voterStatus !== 'Voter').length,
    pwd: activeCitizens.filter((c) => c.pwd === 'Yes').length,
    seniors: activeCitizens.filter((c) => getAge(c.birthdate) >= 60).length,
    male: activeCitizens.filter((c) => c.gender === 'Male').length,
    female: activeCitizens.filter((c) => c.gender === 'Female').length,
    activeBlotters: blotters.filter((b) => !b.resolved).length,
    pendingRequests: requests.filter((r) => !r.resolved).length,
  };

  const isAdmin = currentUser?.role === 'admin';
  const isCitizen = currentUser?.role === 'Citizen';
  const myCitizenRecord = isCitizen
    ? citizens.find((c) => c.id === currentUser.citizenId) || citizens[0]
    : null;

  const navLinks = isCitizen
    ? [
        { id: 'citizen-home', label: 'Home & News', icon: Home },
        { id: 'citizen-requests', label: 'My Requests', icon: ClipboardList },
        { id: 'citizen-blotter', label: 'File Complaint', icon: ShieldAlert },
        { id: 'citizen-profile', label: 'My Profile', icon: User },
      ]
    : [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        ...(isAdmin ? [{ id: 'users', label: 'User Account', icon: UserPlus }] : []),
        ...(isAdmin ? [{ id: 'officials', label: 'Officials', icon: Building2 }] : []),
        { id: 'citizens', label: 'Citizen', icon: Users },
        { id: 'blotter', label: 'Blotter', icon: ShieldAlert },
        { id: 'requests', label: 'Request', icon: ClipboardList },
        { id: 'certificates', label: 'Certificates', icon: FileCheck },
        { id: 'sms', label: 'News (SMS)', icon: MessageSquare },
      ];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-4" style={{ backgroundImage: `linear-gradient(rgba(15, 45, 25, 0.72), rgba(15, 45, 25, 0.78)), url(${barangayBanner})` }}>
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-green-100">
          <div className="flex flex-col items-center text-center mb-5">
            <img src={barangaySeal} alt="Barangay Fatima I Seal" className="h-20 w-20 rounded-full object-cover shadow mb-3 border-4 border-lime-200 bg-white" />
            <p className="text-xs font-bold uppercase tracking-wider text-green-800">Barangay Information Management System</p>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Barangay Fatima I</h1>
            <p className="text-sm text-slate-500">City of Dasmarinas, Cavite</p>
          </div>

          <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1 mb-5">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setLoginError(''); }}
              className={`rounded-md py-1.5 text-xs font-semibold ${authMode === 'login' ? 'bg-white text-green-900 shadow-sm' : 'text-slate-600'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setLoginError(''); }}
              className={`rounded-md py-1.5 text-xs font-semibold ${authMode === 'register' ? 'bg-white text-green-900 shadow-sm' : 'text-slate-600'}`}
            >
              Citizen Register
            </button>
          </div>

          {authMode === 'login' ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="admin, secretary, or citizen"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="password123"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    required
                  />
                </div>

                {loginError && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-800 py-2.5 text-sm font-semibold text-white hover:bg-green-900"
                >
                  LOGIN
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center mb-3">Quick Demo Login (password: password123)</p>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => demoLogin('admin')} className="rounded-lg bg-green-50 border border-green-200 py-2 text-xs font-semibold text-green-900 hover:bg-green-100">
                    Admin
                  </button>
                  <button type="button" onClick={() => demoLogin('Secretary')} className="rounded-lg bg-lime-50 border border-lime-300 py-2 text-xs font-semibold text-lime-900 hover:bg-lime-100">
                    Secretary
                  </button>
                  <button type="button" onClick={() => demoLogin('Citizen')} className="rounded-lg bg-emerald-50 border border-emerald-200 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-100">
                    Citizen
                  </button>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input required placeholder="First Name" value={regForm.fname} onChange={(e) => setRegForm({ ...regForm, fname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <input required placeholder="Last Name" value={regForm.lname} onChange={(e) => setRegForm({ ...regForm, lname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </div>
              <input required placeholder="Contact # (09xxxxxxxxx)" value={regForm.contactNo} onChange={(e) => setRegForm({ ...regForm, contactNo: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <div className="grid grid-cols-2 gap-2">
                <input readOnly placeholder="Road" value={regForm.purok} onChange={(e) => setRegForm({ ...regForm, purok: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <select value={regForm.residencyType} onChange={(e) => setRegForm({ ...regForm, residencyType: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
                  <option value="Resident">Resident</option>
                  <option value="Non-Resident">Non-Resident</option>
                </select>
              </div>
              <input required placeholder="Choose Username" value={regForm.username} onChange={(e) => setRegForm({ ...regForm, username: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input required type="password" placeholder="Choose Password (min 6 chars)" value={regForm.password} onChange={(e) => setRegForm({ ...regForm, password: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              {loginError && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                  {loginError}
                </div>
              )}
              <button type="submit" className="w-full rounded-lg bg-green-800 py-2.5 text-sm font-semibold text-white hover:bg-green-900">
                CREATE CITIZEN ACCOUNT
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f4e8] text-slate-900 flex flex-col">
      <header className="sticky top-0 z-30 h-16 bg-white border-b-2 border-green-800 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden rounded-lg p-2 text-green-900 hover:bg-green-50"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <img src={barangaySeal} alt="Barangay Fatima I Seal" className="h-10 w-10 rounded-full object-cover border-2 border-green-800 bg-white" />
          <div>
            <div className="font-bold text-green-900 text-sm sm:text-base">Barangay Fatima I.</div>
            <div className="text-xs text-slate-500 hidden sm:block">
              {isCitizen ? 'Citizen Online Portal' : 'Dasmarinas, Cavite - BIMS'}
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 px-3 py-1.5 text-sm text-green-950"
          >
            <span className="hidden sm:inline text-slate-500">Welcome,</span>
            <span className="font-semibold">{currentUser.name}</span>
            <ChevronDown className="h-4 w-4 text-green-800" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white py-1 shadow-lg border border-slate-200 text-slate-700 z-40">
              {!isCitizen && (
                <>
                  <button type="button" onClick={() => { setPage('citizens'); setDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-green-50">
                    <Archive className="h-4 w-4" />
                    Archived Citizens
                  </button>
                  <button type="button" onClick={() => { setPage('blotter'); setDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-green-50">
                    <CheckCircle2 className="h-4 w-4" />
                    Resolved Blotter
                  </button>
                  <button type="button" onClick={() => { setPage('requests'); setDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-green-50">
                    <FileText className="h-4 w-4" />
                    Resolved Requests
                  </button>
                </>
              )}
              <button type="button" onClick={() => { setPage('password'); setDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-green-50">
                <KeyRound className="h-4 w-4" />
                Change Password
              </button>
              {!isCitizen && (
                <button type="button" onClick={handleResetData} className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-green-50">
                  <RefreshCw className="h-4 w-4" />
                  Reset Sample Data
                </button>
              )}
              <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden lg:flex w-60 flex-col bg-[#7c8c26] text-white">
          <div className="px-4 pt-5 pb-2 text-xs font-bold uppercase tracking-wider text-lime-100">
            {isCitizen ? 'Citizen Portal' : 'Menu'}
          </div>
          <nav className="flex-1 px-3 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPage(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide ${
                    page === item.id ? 'bg-green-900 text-white shadow' : 'text-lime-50 hover:bg-green-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-lime-700/60 text-xs text-lime-100">
            Barangay Fatima I<br />Dasmarinas, Cavite
          </div>
        </aside>

        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div className="fixed inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
            <aside className="relative w-64 bg-[#7c8c26] text-white flex flex-col z-50">
              <div className="h-16 px-4 flex items-center justify-between border-b border-lime-700">
                <span className="font-bold">Barangay Fatima I</span>
                <button type="button" onClick={() => setMenuOpen(false)} className="p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => { setPage(item.id); setMenuOpen(false); }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold uppercase ${
                        page === item.id ? 'bg-green-900 text-white' : 'text-lime-50 hover:bg-green-800/60'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {isCitizen && page === 'citizen-home' && (
              <CitizenHomePage
                citizen={myCitizenRecord}
                smsLogs={smsLogs}
                requests={requests}
                hasActiveBlotter={hasActiveBlotter}
                setPage={setPage}
              />
            )}
            {isCitizen && page === 'citizen-requests' && (
              <CitizenRequestsPage
                citizen={myCitizenRecord}
                requests={requests}
                setRequests={setRequests}
                notify={notify}
              />
            )}
            {isCitizen && page === 'citizen-blotter' && (
              <CitizenBlotterPage
                citizen={myCitizenRecord}
                blotters={blotters}
                setBlotters={setBlotters}
                notify={notify}
              />
            )}
            {isCitizen && page === 'citizen-profile' && (
              <CitizenProfilePage
                citizen={myCitizenRecord}
                onUpdate={(updated) => {
                  setCitizens(citizens.map((c) => (c.id === updated.id ? updated : c)));
                  notify('Profile updated.');
                }}
              />
            )}

            {!isCitizen && page === 'dashboard' && (
              <DashboardPage stats={stats} blotters={blotters} requests={requests} smsLogs={smsLogs} setPage={setPage} />
            )}
            {!isCitizen && page === 'citizens' && (
              <CitizensPage citizens={citizens} setCitizens={setCitizens} hasActiveBlotter={hasActiveBlotter} notify={notify} askConfirm={askConfirm} />
            )}
            {!isCitizen && page === 'officials' && isAdmin && (
              <OfficialsPage officials={officials} setOfficials={setOfficials} notify={notify} askConfirm={askConfirm} />
            )}
            {!isCitizen && page === 'blotter' && (
              <BlotterPage blotters={blotters} setBlotters={setBlotters} officials={officials} notify={notify} askConfirm={askConfirm} />
            )}
            {!isCitizen && page === 'requests' && (
              <RequestsPage requests={requests} setRequests={setRequests} notify={notify} askConfirm={askConfirm} />
            )}
            {!isCitizen && page === 'certificates' && (
              <CertificatesPage
                citizens={citizens}
                officials={officials}
                hasActiveBlotter={hasActiveBlotter}
                notify={notify}
              />
            )}
            {!isCitizen && page === 'sms' && (
              <SmsPage citizens={citizens} smsLogs={smsLogs} setSmsLogs={setSmsLogs} notify={notify} />
            )}
            {!isCitizen && page === 'users' && isAdmin && (
              <UsersPage users={users} setUsers={setUsers} currentUser={currentUser} notify={notify} askConfirm={askConfirm} />
            )}
            {page === 'password' && (
              <PasswordPage
                currentUser={currentUser}
                onChangePassword={(newPass) => {
                  setUsers(users.map((u) => (u.id === currentUser.id ? { ...u, password: newPass } : u)));
                  setCurrentUser({ ...currentUser, password: newPass });
                  notify('Password changed.');
                }}
              />
            )}
          </div>
        </main>
      </div>

      <Modal open={Boolean(confirmBox)} title={confirmBox?.title || 'Confirm'} onClose={() => setConfirmBox(null)}>
        <p className="text-sm text-slate-600 mb-5">{confirmBox?.text}</p>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => setConfirmBox(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Cancel</button>
          <button
            type="button"
            onClick={() => {
              const fn = confirmBox?.onYes;
              setConfirmBox(null);
              if (fn) fn();
            }}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${confirmBox?.isDanger ? 'bg-red-600' : 'bg-green-800'}`}
          >
            Confirm
          </button>
        </div>
      </Modal>

      {message && (
        <div className="fixed bottom-5 right-5 z-50">
          <div className={`rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${message.isError ? 'bg-red-600' : 'bg-green-800'}`}>
            {message.text}
          </div>
        </div>
      )}
    </div>
  );
}

function CitizenHomePage({ citizen, smsLogs, requests, hasActiveBlotter, setPage }) {
  const myRequests = requests.filter(
    (r) => r.fname.toLowerCase() === citizen.fname.toLowerCase() && r.lname.toLowerCase() === citizen.lname.toLowerCase()
  );
  const restricted = hasActiveBlotter(citizen.fname, citizen.lname);

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-[#4f6d52] text-white p-6 shadow-sm flex items-center gap-4">
        <img src={barangaySeal} alt="Barangay Fatima I" className="h-16 w-16 rounded-full object-cover border-2 border-lime-200 bg-white shrink-0" />
        <div>
        <h1 className="text-2xl font-bold">Welcome, {citizen.fname} {citizen.lname}</h1>
        <p className="text-sm text-lime-100 mt-1">
          {citizen.residencyType} • {citizen.purok} • Household {citizen.householdNo || 'N/A'}
        </p>
        {restricted && (
          <div className="mt-3 rounded-lg bg-rose-900/60 border border-rose-300/40 px-3 py-2 text-xs text-rose-100 inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            You currently have an active blotter record. Please coordinate with the Barangay Hall.
          </div>
        )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button type="button" onClick={() => setPage('citizen-requests')} className="text-left rounded-xl bg-white p-5 border border-slate-200 shadow-sm hover:border-green-600">
          <ClipboardList className="h-7 w-7 text-green-800 mb-2" />
          <div className="font-bold text-slate-900">Request Document / Property</div>
          <div className="text-xs text-slate-500 mt-1">You have {myRequests.filter((r) => !r.resolved).length} pending request(s)</div>
        </button>
        <button type="button" onClick={() => setPage('citizen-blotter')} className="text-left rounded-xl bg-white p-5 border border-slate-200 shadow-sm hover:border-green-600">
          <ShieldAlert className="h-7 w-7 text-rose-700 mb-2" />
          <div className="font-bold text-slate-900">File a Complaint</div>
          <div className="text-xs text-slate-500 mt-1">Submit a blotter report to Barangay Fatima I</div>
        </button>
        <button type="button" onClick={() => setPage('citizen-profile')} className="text-left rounded-xl bg-white p-5 border border-slate-200 shadow-sm hover:border-green-600">
          <User className="h-7 w-7 text-emerald-700 mb-2" />
          <div className="font-bold text-slate-900">My Profile</div>
          <div className="text-xs text-slate-500 mt-1">View or update your personal details</div>
        </button>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
        <h2 className="text-base font-bold text-green-950 flex items-center gap-2 mb-3">
          <Megaphone className="h-4 w-4 text-green-800" />
          Barangay Fatima I Announcements
        </h2>
        <div className="divide-y divide-slate-100">
          {smsLogs.map((a) => (
            <div key={a.id} className="py-3">
              <div className="flex justify-between text-sm">
                <strong className="text-slate-900">{a.title}</strong>
                <span className="text-xs text-slate-400">{a.date}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{a.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white border border-green-900/20 shadow-sm overflow-hidden">
        <div className="bg-[#4f6d52] text-white text-center font-bold py-2 text-sm uppercase">Core Values</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-[#e6eccf]">
          <div className="rounded-lg bg-[#97b770]/40 p-4">
            <h3 className="text-center font-bold text-green-950 mb-1">VISION</h3>
            <p className="text-sm text-center italic">
              "Ang Barangay Fatima I ay isang maka-Diyos, maka Ka-likasan at pamayanang may malasakit sa kapwa. May responsableng pamunuan ng Barangay na may makataong pamamalakad, handa sa ibayong pagbabago ang bagong henerasyon."
            </p>
          </div>
          <div className="rounded-lg bg-[#97b770]/40 p-4">
            <h3 className="text-center font-bold text-green-950 mb-1">MISSION</h3>
            <p className="text-sm text-center italic">
              "Ang pamunuan ng Barangay Fatima I ay makapagbigay ng mabilis at makatarungang serbisyong publiko, makapagtayo ng isang matatag at makataong pamunuan para sa isang maunlad na pamayanan."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CitizenRequestsPage({ citizen, requests, setRequests, notify }) {
  const [category, setCategory] = useState('Document Request');
  const [requestType, setRequestType] = useState('Barangay Clearance');
  const [description, setDescription] = useState('');

  const myRequests = requests.filter(
    (r) => r.fname.toLowerCase() === citizen.fname.toLowerCase() && r.lname.toLowerCase() === citizen.lname.toLowerCase()
  );

  function handleSubmit(e) {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      fname: citizen.fname,
      lname: citizen.lname,
      contactNo: citizen.contactNo,
      dateIssued: new Date().toISOString().slice(0, 10),
      category,
      request: requestType,
      description,
      resolved: false,
    };
    setRequests([entry, ...requests]);
    setDescription('');
    notify('Your request has been submitted to the barangay.');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-950">My Requests</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="font-bold text-green-950 mb-3">Submit New Request</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              <option value="Document Request">Document Request</option>
              <option value="Barangay Property">Barangay Property (Court, Transport)</option>
              <option value="Other">Other Service</option>
            </select>
            <input required placeholder="Request (e.g. Barangay Clearance)" value={requestType} onChange={(e) => setRequestType(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <textarea required rows={3} placeholder="Purpose / Details..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <button type="submit" className="w-full rounded-lg bg-green-700 py-2 text-sm font-semibold text-white hover:bg-green-800">
              Submit Request
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 rounded-xl bg-white shadow-sm border border-slate-200 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-green-900 text-white text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Request</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myRequests.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-6 text-center text-slate-500">No requests submitted yet.</td></tr>
              ) : (
                myRequests.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 text-xs">{r.dateIssued}</td>
                    <td className="px-4 py-3 text-xs">{r.category}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{r.request}</div>
                      <div className="text-xs text-slate-500">{r.description}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.resolved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {r.resolved ? 'Resolved' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CitizenBlotterPage({ citizen, blotters, setBlotters, notify }) {
  const [complaineeFname, setComplaineeFname] = useState('');
  const [complaineeLname, setComplaineeLname] = useState('');
  const [description, setDescription] = useState('');

  const myCases = blotters.filter(
    (b) => b.complainantFname.toLowerCase() === citizen.fname.toLowerCase() && b.complainantLname.toLowerCase() === citizen.lname.toLowerCase()
  );

  function handleFileComplaint(e) {
    e.preventDefault();
    const newCase = {
      id: Date.now(),
      caseNo: String(blotters.length + 1),
      dateIssued: new Date().toISOString().slice(0, 10),
      complainantFname: citizen.fname,
      complainantLname: citizen.lname,
      complaineeFname: complaineeFname.trim(),
      complaineeLname: complaineeLname.trim(),
      hearingStage: 'For Scheduling',
      hearingDate: new Date().toISOString().slice(0, 10),
      description: description.trim(),
      resolved: false,
    };
    setBlotters([newCase, ...blotters]);
    setComplaineeFname('');
    setComplaineeLname('');
    setDescription('');
    notify('Complaint filed as Case #' + newCase.caseNo);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-950">File a Complaint (Blotter)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="font-bold text-green-950 mb-3">Complaint Form</h2>
          <form onSubmit={handleFileComplaint} className="space-y-3">
            <input required placeholder="Respondent First Name" value={complaineeFname} onChange={(e) => setComplaineeFname(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required placeholder="Respondent Last Name" value={complaineeLname} onChange={(e) => setComplaineeLname(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <textarea required rows={4} placeholder="Describe the incident..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <button type="submit" className="w-full rounded-lg bg-green-700 py-2 text-sm font-semibold text-white hover:bg-green-800">
              Submit Complaint
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 rounded-xl bg-white shadow-sm border border-slate-200 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-green-900 text-white text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Case #</th>
                <th className="px-4 py-3">Respondent</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myCases.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-6 text-center text-slate-500">No complaints filed.</td></tr>
              ) : (
                myCases.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 py-3 font-semibold">{b.caseNo}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{b.complaineeFname} {b.complaineeLname}</div>
                      <div className="text-xs text-slate-500">{b.description}</div>
                    </td>
                    <td className="px-4 py-3 text-xs">{b.hearingStage}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${b.resolved ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {b.resolved ? 'Resolved' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CitizenProfilePage({ citizen, onUpdate }) {
  const [form, setForm] = useState(citizen);

  function handleSave(e) {
    e.preventDefault();
    onUpdate(form);
  }

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold text-green-950">My Profile</h1>
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input required placeholder="First Name" value={form.fname} onChange={(e) => setForm({ ...form, fname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input placeholder="Middle Name" value={form.mname} onChange={(e) => setForm({ ...form, mname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required placeholder="Last Name" value={form.lname} onChange={(e) => setForm({ ...form, lname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Contact #" value={form.contactNo} onChange={(e) => setForm({ ...form, contactNo: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Occupation" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input readOnly placeholder="Road" value={form.purok} onChange={(e) => setForm({ ...form, purok: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <input readOnly placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <button type="submit" className="rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

function DashboardPage({ stats, blotters, requests, smsLogs, setPage }) {
  const cards = [
    { label: 'Population', value: stats.population, icon: Users, go: 'citizens' },
    { label: 'Voters', value: stats.voters, icon: UserCheck, go: 'citizens' },
    { label: 'Non-Voters', value: stats.nonVoters, icon: UserMinus, go: 'citizens' },
    { label: 'PWD', value: stats.pwd, icon: Accessibility, go: 'citizens' },
    { label: 'Senior Citizens', value: stats.seniors, icon: Users, go: 'citizens' },
    { label: 'Blotter', value: stats.activeBlotters, icon: ShieldAlert, go: 'blotter' },
    { label: 'Request', value: stats.pendingRequests, icon: ClipboardList, go: 'requests' },
  ];

  const genderData = [
    { name: 'Male', value: stats.male },
    { name: 'Female', value: stats.female },
  ];

  const barData = [
    { name: 'Voters', count: stats.voters },
    { name: 'Non-Voters', count: stats.nonVoters },
    { name: 'Seniors', count: stats.seniors },
    { name: 'PWD', count: stats.pwd },
  ];

  const activeBlotters = blotters.filter((b) => !b.resolved).slice(0, 3);
  const pendingRequests = requests.filter((r) => !r.resolved).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.label}
              type="button"
              onClick={() => setPage(card.go)}
              className="text-left rounded-xl bg-[#4f6d52] text-white p-5 shadow-sm hover:bg-[#3f5942] flex items-center justify-between transition-colors"
            >
              <div>
                <div className="text-3xl font-bold">{card.value}</div>
                <div className="text-sm text-lime-200 underline mt-1">{card.label}</div>
              </div>
              <Icon className="h-9 w-9 text-lime-200 opacity-90" />
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl bg-white border border-green-900/20 shadow-sm overflow-hidden">
          <div className="bg-[#4f6d52] text-white text-center font-bold py-2.5 text-sm uppercase tracking-wide">
            Core Values
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-[#e6eccf]">
            <div className="rounded-lg bg-[#97b770]/40 p-4 border border-green-800/20">
              <h3 className="text-center font-bold text-green-950 text-base mb-2">VISION</h3>
              <p className="text-sm text-slate-800 text-center italic leading-relaxed">
                "Ang Barangay Fatima I ay isang maka-Diyos, maka Ka-likasan at pamayanang may malasakit sa kapwa. May responsableng pamunuan ng Barangay na may makataong pamamalakad, handa sa ibayong pagbabago ang bagong henerasyon."
              </p>
            </div>
            <div className="rounded-lg bg-[#97b770]/40 p-4 border border-green-800/20">
              <h3 className="text-center font-bold text-green-950 text-base mb-2">MISSION</h3>
              <p className="text-sm text-slate-800 text-center italic leading-relaxed">
                "Ang pamunuan ng Barangay Fatima I ay makapagbigay ng mabilis at makatarungang serbisyong publiko, makapagtayo ng isang matatag at makataong pamunuan para sa isang maunlad na pamayanan."
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-green-900/20 shadow-sm overflow-hidden">
          <div className="bg-[#4f6d52] text-white text-center font-bold py-2.5 text-sm uppercase tracking-wide">
            Citizen Gender Chart
          </div>
          <div className="h-64 w-full p-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={78} label>
                  <Cell fill="#6366f1" />
                  <Cell fill="#ec4899" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="text-base font-bold text-green-950 mb-3">Barangay Analytics</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f6d52" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-green-950 flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-green-800" />
              Barangay Announcements
            </h2>
            <button type="button" onClick={() => setPage('sms')} className="text-xs font-semibold text-green-800 underline">
              Manage SMS
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {smsLogs.slice(0, 3).map((a) => (
              <div key={a.id} className="py-2.5">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-900">{a.title}</span>
                  <span className="text-xs text-slate-400">{a.date}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{a.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-green-950">Active Blotter Records</h2>
            <button type="button" onClick={() => setPage('blotter')} className="text-xs font-semibold text-green-800 underline">View all</button>
          </div>
          {activeBlotters.length === 0 ? (
            <p className="text-sm text-slate-500">No active blotter cases.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {activeBlotters.map((b) => (
                <div key={b.id} className="py-2 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium">Case #{b.caseNo}: {b.complainantFname} vs. {b.complaineeFname}</div>
                    <div className="text-xs text-slate-500">{b.description}</div>
                  </div>
                  <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">{b.hearingStage}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-green-950">Pending Requests</h2>
            <button type="button" onClick={() => setPage('requests')} className="text-xs font-semibold text-green-800 underline">View all</button>
          </div>
          {pendingRequests.length === 0 ? (
            <p className="text-sm text-slate-500">No pending requests.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingRequests.map((r) => (
                <div key={r.id} className="py-2 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium">{r.fname} {r.lname} - {r.request}</div>
                    <div className="text-xs text-slate-500">{r.category} • {r.description}</div>
                  </div>
                  <span className="text-xs text-slate-400">{r.dateIssued}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const emptyCitizen = {
  fname: '',
  mname: '',
  lname: '',
  placeOfBirth: 'Dasmarinas, Cavite',
  birthdate: '',
  gender: 'Male',
  contactNo: '',
  occupation: '',
  citizenship: 'Filipino',
  civilStatus: 'Single',
  nationalID: '',
  voterStatus: 'Voter',
  email: '',
  address: 'Barangay Fatima I, Dasmarinas, Cavite',
  blk: '',
  lot: '',
  subdivision: 'Phase 1 Windward Hills Subdivision',
  purok: 'Fatima 1',
  precinct: '',
  householdNo: '',
  rentee: 'No',
  fourPs: 'No',
  residencyType: 'Resident',
  memberSince: new Date().toISOString().slice(0, 10),
  pwd: 'No',
};

function CitizensPage({ citizens, setCitizens, hasActiveBlotter, notify, askConfirm }) {
  const [tab, setTab] = useState('active');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyCitizen);
  const [selectedCitizen, setSelectedCitizen] = useState(null);

  const list = citizens.filter((c) => {
    if (tab === 'active' && c.archived) return false;
    if (tab === 'archived' && !c.archived) return false;
    if (tab === 'senior' && (c.archived || getAge(c.birthdate) < 60)) return false;
    if (tab === 'nonresident' && (c.archived || c.residencyType !== 'Non-Resident')) return false;
    if (filterType === 'Voter' && c.voterStatus !== 'Voter') return false;
    if (filterType === 'Non-Voter' && c.voterStatus !== 'Non-Voter') return false;
    if (filterType === 'PWD' && c.pwd !== 'Yes') return false;
    if (filterType === '4Ps' && c.fourPs !== 'Yes') return false;
    const text = (c.fname + ' ' + c.mname + ' ' + c.lname + ' ' + c.nationalID + ' ' + c.purok + ' ' + c.householdNo + ' ' + c.precinct).toLowerCase();
    return text.includes(search.toLowerCase());
  });

  function handleSave(e) {
    e.preventDefault();
    if (editId) {
      setCitizens(citizens.map((c) => (c.id === editId ? { ...form, id: editId, archived: c.archived } : c)));
      notify('Citizen updated.');
    } else {
      setCitizens([{ ...form, id: Date.now(), archived: false }, ...citizens]);
      notify('Citizen added.');
    }
    setOpenForm(false);
  }

  function handleArchive(c) {
    const next = !c.archived;
    askConfirm(next ? 'Archive Citizen' : 'Restore Citizen', (next ? 'Archive ' : 'Restore ') + c.fname + ' ' + c.lname + '?', () => {
      setCitizens(citizens.map((item) => (item.id === c.id ? { ...item, archived: next } : item)));
      notify(next ? 'Citizen archived.' : 'Citizen restored.');
    }, next);
  }

  function exportCsv() {
    const header = 'Full Name,National ID,Birthdate,Age,Gender,Road,Household,Precinct,Voter,PWD,Type,Contact\n';
    const rows = list.map((c) =>
      `"${c.fname} ${c.mname} ${c.lname}","${c.nationalID}","${c.birthdate}",${getAge(c.birthdate)},"${c.gender}","${c.purok}","${c.householdNo}","${c.precinct}","${c.voterStatus}","${c.pwd}","${c.residencyType}","${c.contactNo}"`
    ).join('\n');
    downloadFile('barangay_fatima1_citizens.csv', header + rows, 'text/csv');
    notify('Citizens exported to CSV.');
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-green-950">Barangay Citizen Information</h1>
          <p className="text-sm text-slate-600">Residents, Non-Residents, Roads, Precincts, and Households</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-lg bg-white border border-green-700 px-3.5 py-2 text-sm font-semibold text-green-900 hover:bg-green-50">
            <Download className="h-4 w-4" />
            EXPORT
          </button>
          <button
            type="button"
            onClick={() => { setEditId(null); setForm(emptyCitizen); setOpenForm(true); }}
            className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
          >
            <Plus className="h-4 w-4" />
            ADD
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setTab('active')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'active' ? 'bg-green-800 text-white' : 'bg-slate-100'}`}>
            Active ({citizens.filter((c) => !c.archived).length})
          </button>
          <button type="button" onClick={() => setTab('senior')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'senior' ? 'bg-green-800 text-white' : 'bg-slate-100'}`}>
            Seniors ({citizens.filter((c) => !c.archived && getAge(c.birthdate) >= 60).length})
          </button>
          <button type="button" onClick={() => setTab('nonresident')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'nonresident' ? 'bg-green-800 text-white' : 'bg-slate-100'}`}>
            Non-Residents ({citizens.filter((c) => !c.archived && c.residencyType === 'Non-Resident').length})
          </button>
          <button type="button" onClick={() => setTab('archived')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'archived' ? 'bg-green-800 text-white' : 'bg-slate-100'}`}>
            Archived ({citizens.filter((c) => c.archived).length})
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, national ID, road, precinct, household..."
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm"
            />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
            <option value="All">--Select filter--</option>
            <option value="Voter">Voters</option>
            <option value="Non-Voter">Non-Voters</option>
            <option value="PWD">PWD</option>
            <option value="4Ps">4Ps Beneficiary</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-green-900 text-white text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">National ID</th>
              <th className="px-4 py-3">Age / Gender</th>
              <th className="px-4 py-3">Road / Household</th>
              <th className="px-4 py-3">Precinct</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-6 text-center text-slate-500">No citizens found.</td></tr>
            ) : (
              list.map((c) => (
                <tr key={c.id} className="hover:bg-green-50/40">
                  <td className="px-4 py-3 font-medium">
                    <div>{c.fname} {c.mname} {c.lname}</div>
                    <div className="text-xs text-slate-500">{c.contactNo}</div>
                  </td>
                  <td className="px-4 py-3 text-xs">{c.nationalID || '-'}</td>
                  <td className="px-4 py-3">{getAge(c.birthdate)} / {c.gender}</td>
                  <td className="px-4 py-3 text-xs">{c.purok} • {c.householdNo || '-'}</td>
                  <td className="px-4 py-3 text-xs">{c.precinct || '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{c.voterStatus}</span>
                      {c.residencyType === 'Non-Resident' && <span className="rounded-full bg-amber-50 text-amber-800 px-2 py-0.5 text-xs">Non-Resident</span>}
                      {c.pwd === 'Yes' && <span className="rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 text-xs">PWD</span>}
                      {c.fourPs === 'Yes' && <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs">4Ps</span>}
                      {hasActiveBlotter(c.fname, c.lname) && <span className="rounded-full bg-rose-50 text-rose-700 px-2 py-0.5 text-xs">Blotter</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <button type="button" onClick={() => setSelectedCitizen(c)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => { setEditId(c.id); setForm(c); setOpenForm(true); }} className="p-1.5 text-green-700 hover:bg-green-50 rounded">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => handleArchive(c)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded">
                        {c.archived ? <RotateCcw className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal open={openForm} title={editId ? 'Edit Barangay Citizen' : 'Add Barangay Citizen'} onClose={() => setOpenForm(false)}>
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input required placeholder="First Name *" value={form.fname} onChange={(e) => setForm({ ...form, fname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input placeholder="Middle Name" value={form.mname} onChange={(e) => setForm({ ...form, mname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required placeholder="Last Name *" value={form.lname} onChange={(e) => setForm({ ...form, lname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input required type="date" value={form.birthdate} onChange={(e) => setForm({ ...form, birthdate: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select value={form.civilStatus} onChange={(e) => setForm({ ...form, civilStatus: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input placeholder="National ID" value={form.nationalID} onChange={(e) => setForm({ ...form, nationalID: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required placeholder="Contact # *" value={form.contactNo} onChange={(e) => setForm({ ...form, contactNo: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required placeholder="Occupation *" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input readOnly placeholder="Road" value={form.purok} onChange={(e) => setForm({ ...form, purok: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input placeholder="Precinct (e.g. 0042A)" value={form.precinct} onChange={(e) => setForm({ ...form, precinct: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input placeholder="Household No. (e.g. HH-001)" value={form.householdNo} onChange={(e) => setForm({ ...form, householdNo: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input placeholder="Blk" value={form.blk} onChange={(e) => setForm({ ...form, blk: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input placeholder="Lot" value={form.lot} onChange={(e) => setForm({ ...form, lot: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input placeholder="Subdivision" value={form.subdivision} onChange={(e) => setForm({ ...form, subdivision: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <select value={form.voterStatus} onChange={(e) => setForm({ ...form, voterStatus: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              <option value="Voter">Voter</option>
              <option value="Non-Voter">Non-Voter</option>
            </select>
            <select value={form.pwd} onChange={(e) => setForm({ ...form, pwd: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              <option value="No">PWD: No</option>
              <option value="Yes">PWD: Yes</option>
            </select>
            <select value={form.rentee} onChange={(e) => setForm({ ...form, rentee: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              <option value="No">Rentee: No</option>
              <option value="Yes">Rentee: Yes</option>
            </select>
            <select value={form.fourPs} onChange={(e) => setForm({ ...form, fourPs: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              <option value="No">4Ps: No</option>
              <option value="Yes">4Ps: Yes</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select value={form.residencyType} onChange={(e) => setForm({ ...form, residencyType: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              <option value="Resident">Registered Resident</option>
              <option value="Non-Resident">Non-Resident</option>
            </select>
            <input placeholder="Place of Birth" value={form.placeOfBirth} onChange={(e) => setForm({ ...form, placeOfBirth: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <input readOnly placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpenForm(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Close</button>
            <button type="submit" className="rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white">{editId ? 'UPDATE' : 'ADD'}</button>
          </div>
        </form>
      </Modal>

      <Modal open={Boolean(selectedCitizen)} title="Barangay Citizen Profile" onClose={() => setSelectedCitizen(null)}>
        {selectedCitizen && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={barangaySeal} alt="Barangay Fatima I" className="h-12 w-12 rounded-full object-cover border border-green-800" />
                <div className="text-lg font-bold text-green-950">{selectedCitizen.fname} {selectedCitizen.mname} {selectedCitizen.lname}</div>
              </div>
              <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-3 py-1.5 text-xs font-semibold text-white">
                <Printer className="h-3.5 w-3.5" />
                Print
              </button>
            </div>
            {hasActiveBlotter(selectedCitizen.fname, selectedCitizen.lname) && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Active blotter record found. Certificate issuance is restricted.
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div><strong>National ID:</strong> {selectedCitizen.nationalID || '-'}</div>
              <div><strong>Type:</strong> {selectedCitizen.residencyType}</div>
              <div><strong>Birthdate:</strong> {selectedCitizen.birthdate} ({getAge(selectedCitizen.birthdate)} yrs)</div>
              <div><strong>Place of Birth:</strong> {selectedCitizen.placeOfBirth}</div>
              <div><strong>Gender / Civil Status:</strong> {selectedCitizen.gender} / {selectedCitizen.civilStatus}</div>
              <div><strong>Contact:</strong> {selectedCitizen.contactNo}</div>
              <div><strong>Road / Precinct:</strong> {selectedCitizen.purok} / {selectedCitizen.precinct || '-'}</div>
              <div><strong>Household No.:</strong> {selectedCitizen.householdNo || '-'}</div>
              <div><strong>Voter / PWD:</strong> {selectedCitizen.voterStatus} / {selectedCitizen.pwd}</div>
              <div><strong>Rentee / 4Ps:</strong> {selectedCitizen.rentee} / {selectedCitizen.fourPs}</div>
              <div className="col-span-2"><strong>Address:</strong> {selectedCitizen.blk} {selectedCitizen.lot}, {selectedCitizen.subdivision}, {selectedCitizen.address}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

const emptyOfficial = {
  position: '',
  prefix: 'Mr',
  fname: '',
  mname: '',
  lname: '',
  suffix: '',
  contactNo: '',
  address: 'Barangay Fatima I, Dasmarinas, Cavite',
  startOfTerm: '2024-01-01',
  endOfTerm: '2026-11-01',
};

function OfficialsPage({ officials, setOfficials, notify, askConfirm }) {
  const [tab, setTab] = useState('council');
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyOfficial);

  const list = officials.filter((o) => {
    if (tab === 'council' && (o.isOther || o.archived)) return false;
    if (tab === 'others' && (!o.isOther || o.archived)) return false;
    if (tab === 'archived' && !o.archived) return false;
    return (o.position + ' ' + o.fname + ' ' + o.lname).toLowerCase().includes(search.toLowerCase());
  });

  function handleSave(e) {
    e.preventDefault();
    if (editId) {
      setOfficials(officials.map((o) => (o.id === editId ? { ...o, ...form } : o)));
      notify('Official updated.');
    } else {
      setOfficials([...officials, { ...form, id: Date.now(), isOther: true, archived: false }]);
      notify('Official added.');
    }
    setOpenForm(false);
  }

  function exportCsv() {
    const header = 'Position,Name,Contact,Address,Start of Term,End of Term\n';
    const rows = list.map((o) => `"${o.position}","${getFullName(o)}","${o.contactNo}","${o.address}","${o.startOfTerm}","${o.endOfTerm}"`).join('\n');
    downloadFile('barangay_fatima1_officials.csv', header + rows, 'text/csv');
    notify('Officials exported to CSV.');
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-green-950">Barangay Officials Information</h1>
          <p className="text-sm text-slate-600">Barangay Council and Other Positions</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-lg bg-white border border-green-700 px-3.5 py-2 text-sm font-semibold text-green-900">
            <Download className="h-4 w-4" />
            EXPORT
          </button>
          <button
            type="button"
            onClick={() => { setEditId(null); setForm(emptyOfficial); setOpenForm(true); }}
            className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            ADD
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex gap-2">
          <button type="button" onClick={() => setTab('council')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'council' ? 'bg-green-800 text-white' : 'bg-slate-100'}`}>Council</button>
          <button type="button" onClick={() => setTab('others')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'others' ? 'bg-green-800 text-white' : 'bg-slate-100'}`}>Other Positions</button>
          <button type="button" onClick={() => setTab('archived')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'archived' ? 'bg-green-800 text-white' : 'bg-slate-100'}`}>Archived</button>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search position, name..."
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm sm:w-64"
        />
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-green-900 text-white text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact #</th>
              <th className="px-4 py-3">Term</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((o) => (
              <tr key={o.id} className="hover:bg-green-50/40">
                <td className="px-4 py-3 font-semibold text-green-900">{o.position}</td>
                <td className="px-4 py-3">{getFullName(o)}</td>
                <td className="px-4 py-3">{o.contactNo}</td>
                <td className="px-4 py-3 text-xs">{o.startOfTerm} to {o.endOfTerm}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button type="button" onClick={() => { setEditId(o.id); setForm(o); setOpenForm(true); }} className="p-1.5 text-green-700 hover:bg-green-50 rounded">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    {o.isOther && !o.archived && (
                      <button
                        type="button"
                        onClick={() => askConfirm('Archive Official', 'Archive ' + getFullName(o) + '?', () => {
                          setOfficials(officials.map((x) => (x.id === o.id ? { ...x, archived: true } : x)));
                          notify('Official archived.');
                        })}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"
                      >
                        <Archive className="h-4 w-4" />
                      </button>
                    )}
                    {o.isOther && o.archived && (
                      <button
                        type="button"
                        onClick={() => askConfirm('Delete Official', 'Delete ' + getFullName(o) + '?', () => {
                          setOfficials(officials.filter((x) => x.id !== o.id));
                          notify('Official deleted.');
                        }, true)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={openForm} title={editId ? 'Edit Official' : 'Add Official'} onClose={() => setOpenForm(false)}>
        <form onSubmit={handleSave} className="space-y-3">
          <input required placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <input placeholder="Prefix" value={form.prefix} onChange={(e) => setForm({ ...form, prefix: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required placeholder="First Name" value={form.fname} onChange={(e) => setForm({ ...form, fname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input placeholder="Middle Name" value={form.mname} onChange={(e) => setForm({ ...form, mname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required placeholder="Last Name" value={form.lname} onChange={(e) => setForm({ ...form, lname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input placeholder="Suffix" value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input required placeholder="Contact #" value={form.contactNo} onChange={(e) => setForm({ ...form, contactNo: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input type="date" value={form.startOfTerm} onChange={(e) => setForm({ ...form, startOfTerm: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input type="date" value={form.endOfTerm} onChange={(e) => setForm({ ...form, endOfTerm: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <input readOnly placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpenForm(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Cancel</button>
            <button type="submit" className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const emptyBlotter = {
  caseNo: '',
  dateIssued: new Date().toISOString().slice(0, 10),
  complainantFname: '',
  complainantLname: '',
  complaineeFname: '',
  complaineeLname: '',
  hearingStage: '1st Hearing',
  hearingDate: new Date().toISOString().slice(0, 10),
  description: '',
};

function BlotterPage({ blotters, setBlotters, officials, notify, askConfirm }) {
  const [tab, setTab] = useState('active');
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyBlotter);
  const [printCase, setPrintCase] = useState(null);

  const list = blotters.filter((b) => {
    if (tab === 'active' && b.resolved) return false;
    if (tab === 'resolved' && !b.resolved) return false;
    const text = (b.caseNo + ' ' + b.complainantFname + ' ' + b.complainantLname + ' ' + b.complaineeFname + ' ' + b.complaineeLname).toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const captain = officials.find((o) => o.position === 'Captain');
  const secretary = officials.find((o) => o.position === 'Secretary');

  function handleSave(e) {
    e.preventDefault();
    if (editId) {
      setBlotters(blotters.map((b) => (b.id === editId ? { ...form, id: editId, resolved: b.resolved } : b)));
      notify('Blotter updated.');
    } else {
      setBlotters([{ ...form, id: Date.now(), resolved: false }, ...blotters]);
      notify('Blotter added.');
    }
    setOpenForm(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-green-950">Blotter Records</h1>
          <p className="text-sm text-slate-600">Digitized complaints, hearings, and Certificate to File Action</p>
        </div>
        <button
          type="button"
          onClick={() => { setEditId(null); setForm({ ...emptyBlotter, caseNo: String(blotters.length + 1) }); setOpenForm(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          ADD
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex gap-2">
          <button type="button" onClick={() => setTab('active')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'active' ? 'bg-green-800 text-white' : 'bg-slate-100'}`}>
            Active ({blotters.filter((b) => !b.resolved).length})
          </button>
          <button type="button" onClick={() => setTab('resolved')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'resolved' ? 'bg-green-800 text-white' : 'bg-slate-100'}`}>
            Resolved ({blotters.filter((b) => b.resolved).length})
          </button>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search case or name..."
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm sm:w-64"
        />
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-green-900 text-white text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Case #</th>
              <th className="px-4 py-3">Date Issued</th>
              <th className="px-4 py-3">Complainant</th>
              <th className="px-4 py-3">Complainee</th>
              <th className="px-4 py-3">Hearing</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((b) => (
              <tr key={b.id} className="hover:bg-green-50/40">
                <td className="px-4 py-3 font-semibold">{b.caseNo}</td>
                <td className="px-4 py-3 text-xs">{b.dateIssued}</td>
                <td className="px-4 py-3">{b.complainantFname} {b.complainantLname}</td>
                <td className="px-4 py-3 text-rose-700 font-medium">{b.complaineeFname} {b.complaineeLname}</td>
                <td className="px-4 py-3 text-xs">{b.hearingStage} ({b.hearingDate})</td>
                <td className="px-4 py-3 max-w-xs truncate">{b.description}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button type="button" onClick={() => setPrintCase(b)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded" title="Certificate to File Action">
                      <Printer className="h-4 w-4" />
                    </button>
                    {!b.resolved && (
                      <>
                        <button type="button" onClick={() => { setEditId(b.id); setForm(b); setOpenForm(true); }} className="p-1.5 text-green-700 hover:bg-green-50 rounded">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => askConfirm('Resolve Blotter', 'Mark Case #' + b.caseNo + ' as resolved?', () => {
                            setBlotters(blotters.map((x) => (x.id === b.id ? { ...x, resolved: true, hearingStage: 'Settled' } : x)));
                            notify('Blotter resolved.');
                          })}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={openForm} title={editId ? 'Edit Blotter Record' : 'Add Blotter Record'} onClose={() => setOpenForm(false)}>
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input required placeholder="Case Number" value={form.caseNo} onChange={(e) => setForm({ ...form, caseNo: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required type="date" value={form.dateIssued} onChange={(e) => setForm({ ...form, dateIssued: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input required placeholder="Complainant First Name" value={form.complainantFname} onChange={(e) => setForm({ ...form, complainantFname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required placeholder="Complainant Last Name" value={form.complainantLname} onChange={(e) => setForm({ ...form, complainantLname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input required placeholder="Complainee First Name" value={form.complaineeFname} onChange={(e) => setForm({ ...form, complaineeFname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required placeholder="Complainee Last Name" value={form.complaineeLname} onChange={(e) => setForm({ ...form, complaineeLname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select value={form.hearingStage} onChange={(e) => setForm({ ...form, hearingStage: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              <option value="1st Hearing">1st Hearing</option>
              <option value="2nd Hearing">2nd Hearing</option>
              <option value="3rd Hearing">3rd Hearing</option>
              <option value="CFA Issued">CFA Issued</option>
            </select>
            <input type="date" value={form.hearingDate} onChange={(e) => setForm({ ...form, hearingDate: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <textarea required rows={3} placeholder="Write Brief Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpenForm(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Close</button>
            <button type="submit" className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white">Save</button>
          </div>
        </form>
      </Modal>

      <Modal open={Boolean(printCase)} title="Generate Certificate of File Action" onClose={() => setPrintCase(null)} wide>
        {printCase && (
          <div className="space-y-4">
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  const html = buildCfaHtml(
                    printCase,
                    secretary ? getFullName(secretary) : 'Barangay Secretary',
                    captain ? getFullName(captain) : 'Punong Barangay'
                  );
                  downloadWordDoc('Certificate_to_File_Action_Case_' + printCase.caseNo + '.doc', html);
                  notify('Downloaded Word file (.doc).');
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-semibold text-green-900 hover:bg-green-50"
              >
                <Download className="h-4 w-4" />
                Download Word (.doc)
              </button>
              <button
                type="button"
                onClick={() => {
                  const html = buildCfaHtml(
                    printCase,
                    secretary ? getFullName(secretary) : 'Barangay Secretary',
                    captain ? getFullName(captain) : 'Punong Barangay'
                  );
                  printDocumentHtml('Certificate to File Action', html);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
              >
                <Printer className="h-4 w-4" />
                Print / Save PDF
              </button>
            </div>
            <div className="p-8 bg-white font-serif space-y-5">
              <div className="flex items-center justify-center gap-4 border-b-2 border-slate-800 pb-4">
                <img src={barangaySeal} alt="Barangay Fatima I Seal" className="h-16 w-16 rounded-full object-cover" />
                <div className="text-center">
                  <div className="text-xs uppercase">Republic of the Philippines</div>
                  <div className="text-xs uppercase">Province of Cavite • City of Dasmarinas</div>
                  <div className="text-lg font-bold mt-1">BARANGAY FATIMA I</div>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold uppercase underline">Certificate to File Action</h2>
              </div>
              <div className="text-sm space-y-1">
                <div><strong>COMPLAINANT:</strong> {printCase.complainantFname} {printCase.complainantLname}</div>
                <div><strong>COMPLAINEE:</strong> {printCase.complaineeFname} {printCase.complaineeLname}</div>
              </div>
              <p className="text-sm font-bold">TO WHOM IT MAY CONCERN:</p>
              <p className="text-sm leading-relaxed">
                This is to certify that the case between {printCase.complainantFname} {printCase.complainantLname} and {printCase.complaineeFname} {printCase.complaineeLname} regarding "{printCase.description}" was not solved in our barangay. The complainant wants to endorse this case to the higher court.
              </p>
              <p className="text-sm">
                This certificate to file action was done at Barangay Fatima I, Dasmarinas, Cavite this {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 text-center text-sm">
                <div>
                  <div className="font-bold border-t border-slate-800 pt-1">{secretary ? getFullName(secretary) : 'Barangay Secretary'}</div>
                  <div className="text-xs">Barangay Secretary</div>
                </div>
                <div>
                  <div className="font-bold border-t border-slate-800 pt-1">{captain ? getFullName(captain) : 'Punong Barangay'}</div>
                  <div className="text-xs">Punong Barangay</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

const emptyRequest = {
  fname: '',
  lname: '',
  contactNo: '',
  dateIssued: new Date().toISOString().slice(0, 10),
  category: 'Document Request',
  request: '',
  description: '',
};

function RequestsPage({ requests, setRequests, notify, askConfirm }) {
  const [tab, setTab] = useState('pending');
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState(emptyRequest);

  const list = requests.filter((r) => (tab === 'pending' ? !r.resolved : r.resolved));

  function handleAdd(e) {
    e.preventDefault();
    setRequests([{ ...form, id: Date.now(), resolved: false }, ...requests]);
    setForm(emptyRequest);
    setOpenForm(false);
    notify('Request added.');
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-green-950">Request Forms</h1>
          <p className="text-sm text-slate-600">Document requests, Barangay Properties (Court, Transportation), and Blotter requests</p>
        </div>
        <button type="button" onClick={() => setOpenForm(true)} className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" />
          ADD
        </button>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={() => setTab('pending')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'pending' ? 'bg-green-800 text-white' : 'bg-white border border-slate-200'}`}>
          Pending ({requests.filter((r) => !r.resolved).length})
        </button>
        <button type="button" onClick={() => setTab('resolved')} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === 'resolved' ? 'bg-green-800 text-white' : 'bg-white border border-slate-200'}`}>
          Resolved ({requests.filter((r) => r.resolved).length})
        </button>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-green-900 text-white text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Contact #</th>
              <th className="px-4 py-3">Date Issued</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Request</th>
              <th className="px-4 py-3">Description</th>
              {tab === 'pending' && <th className="px-4 py-3 text-right">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((r) => (
              <tr key={r.id} className="hover:bg-green-50/40">
                <td className="px-4 py-3 font-medium">{r.fname} {r.lname}</td>
                <td className="px-4 py-3">{r.contactNo}</td>
                <td className="px-4 py-3 text-xs">{r.dateIssued}</td>
                <td className="px-4 py-3 text-xs">{r.category}</td>
                <td className="px-4 py-3 font-medium text-green-900">{r.request}</td>
                <td className="px-4 py-3">{r.description}</td>
                {tab === 'pending' && (
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => askConfirm('Resolve Request', 'Mark request as resolved?', () => {
                        setRequests(requests.map((x) => (x.id === r.id ? { ...x, resolved: true } : x)));
                        notify('Request resolved.');
                      })}
                      className="rounded-lg bg-green-100 px-3 py-1 text-xs font-semibold text-green-900 hover:bg-green-200"
                    >
                      Resolve
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={openForm} title="Add Request" onClose={() => setOpenForm(false)}>
        <form onSubmit={handleAdd} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="First Name" value={form.fname} onChange={(e) => setForm({ ...form, fname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required placeholder="Last Name" value={form.lname} onChange={(e) => setForm({ ...form, lname: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Contact #" value={form.contactNo} onChange={(e) => setForm({ ...form, contactNo: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input type="date" value={form.dateIssued} onChange={(e) => setForm({ ...form, dateIssued: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
            <option value="Document Request">Document Request (Clearance / Certificate)</option>
            <option value="Barangay Property">Barangay Property (Basketball Court, Transportation, etc.)</option>
            <option value="Blotter / Complaint">Blotter / Complaint Request</option>
          </select>
          <input required placeholder="What is requested" value={form.request} onChange={(e) => setForm({ ...form, request: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <textarea rows={3} placeholder="Write Brief Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpenForm(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Close</button>
            <button type="submit" className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white">ADD</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function CertificatesPage({ citizens, officials, hasActiveBlotter, notify }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [purpose, setPurpose] = useState('Local Employment');
  const [empStatus, setEmpStatus] = useState('First Time Job Seeker (RA-11261)');
  const [showPreview, setShowPreview] = useState(false);

  const list = citizens.filter((c) => !c.archived && (c.fname + ' ' + c.lname + ' ' + c.nationalID).toLowerCase().includes(search.toLowerCase()));
  const council = officials.filter((o) => !o.isOther && !o.archived);
  const captain = council.find((o) => o.position === 'Captain');
  const secretary = council.find((o) => o.position === 'Secretary');

  function openCert(citizen, type) {
    if (hasActiveBlotter(citizen.fname, citizen.lname)) {
      notify(citizen.fname + ' ' + citizen.lname + ' has an active blotter case.', true);
      return;
    }
    setSelected({ citizen, type });
    setShowPreview(false);
  }

  function getDocTitle(type) {
    if (type === 'certificate') return 'BARANGAY CERTIFICATE';
    if (type === 'clearance') return 'BARANGAY CLEARANCE';
    if (type === 'residency') return 'CERTIFICATE OF RESIDENCY';
    return 'CERTIFICATE OF INDIGENCY';
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-green-950">Barangay Citizen Certificate Issuance</h1>
        <p className="text-sm text-slate-600">Barangay Certificate, Clearance, Residency, and Indigency (supports Residents and Non-Residents)</p>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or national ID..."
          className="w-full sm:w-80 rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-green-900 text-white text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Issue Document</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((c) => {
              const blocked = hasActiveBlotter(c.fname, c.lname);
              return (
                <tr key={c.id} className="hover:bg-green-50/40">
                  <td className="px-4 py-3 font-medium">{c.fname} {c.mname} {c.lname}</td>
                  <td className="px-4 py-3 text-xs">{c.residencyType}</td>
                  <td className="px-4 py-3">
                    {blocked ? (
                      <span className="rounded-full bg-rose-50 text-rose-700 px-2.5 py-0.5 text-xs font-semibold">Restricted</span>
                    ) : (
                      <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-semibold">Eligible</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex flex-wrap justify-end gap-1.5">
                      <button type="button" onClick={() => openCert(c, 'certificate')} className={`rounded px-2.5 py-1 text-xs font-semibold ${blocked ? 'bg-slate-100 text-slate-400' : 'bg-green-800 text-white'}`}>Certificate</button>
                      <button type="button" onClick={() => openCert(c, 'clearance')} className={`rounded px-2.5 py-1 text-xs font-semibold ${blocked ? 'bg-slate-100 text-slate-400' : 'bg-emerald-700 text-white'}`}>Clearance</button>
                      <button type="button" onClick={() => openCert(c, 'residency')} className={`rounded px-2.5 py-1 text-xs font-semibold ${blocked ? 'bg-slate-100 text-slate-400' : 'bg-teal-700 text-white'}`}>Residency</button>
                      <button type="button" onClick={() => openCert(c, 'indigency')} className={`rounded px-2.5 py-1 text-xs font-semibold ${blocked ? 'bg-slate-100 text-slate-400' : 'bg-lime-700 text-white'}`}>Indigency</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal open={Boolean(selected)} title={selected ? 'Generate ' + getDocTitle(selected.type) : 'Generate'} onClose={() => setSelected(null)} wide>
        {selected && !showPreview && (
          <div className="space-y-4">
            <div className="text-sm">Citizen: <strong>{selected.citizen.fname} {selected.citizen.lname}</strong> ({selected.citizen.residencyType})</div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Purpose</label>
              <input value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            {selected.type === 'certificate' && (
              <div>
                <label className="block text-xs text-slate-600 mb-1">Employment Status</label>
                <input value={empStatus} onChange={(e) => setEmpStatus(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setSelected(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Cancel</button>
              <button type="button" onClick={() => setShowPreview(true)} className="rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white">Generate</button>
            </div>
          </div>
        )}

        {selected && showPreview && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button type="button" onClick={() => setShowPreview(false)} className="text-sm text-slate-600 hover:text-slate-900">Back</button>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const c = selected.citizen;
                    const paragraphs = [
                      'This is to certify that <strong style="text-transform:uppercase;">' + c.fname + ' ' + c.mname + ' ' + c.lname + '</strong>, ' + getAge(c.birthdate) + ' years of age, ' + c.citizenship + ', is a ' + (c.residencyType === 'Non-Resident' ? 'non-resident transacting with' : 'bona fide resident of') + ' ' + c.blk + ' ' + c.lot + ', ' + c.address + '.',
                      selected.type === 'certificate'
                        ? 'I further certify that the above-named person is a <strong>' + empStatus + '</strong> and is well known to be of good moral character and a law-abiding citizen.'
                        : selected.type === 'clearance'
                        ? 'This further certifies that the above-named person has no derogatory or pending blotter record in Barangay Fatima I as of this date.'
                        : selected.type === 'residency'
                        ? 'This certifies continuous residency in ' + c.purok + ', Barangay Fatima I since ' + c.memberSince + '.'
                        : 'This further certifies that the above-named individual belongs to an indigent family in this Barangay and is eligible for financial, medical, or educational assistance.',
                    ];
                    const html = buildCertificateHtml(
                      getDocTitle(selected.type),
                      c,
                      council,
                      paragraphs,
                      purpose,
                      secretary ? getFullName(secretary) : 'Barangay Secretary',
                      captain ? getFullName(captain) : 'Punong Barangay'
                    );
                    const fileName = getDocTitle(selected.type).replace(/\s+/g, '_') + '_' + c.lname + '.doc';
                    downloadWordDoc(fileName, html);
                    notify('Downloaded ' + fileName);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-semibold text-green-900 hover:bg-green-50"
                >
                  <Download className="h-4 w-4" />
                  Download Word (.doc)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const c = selected.citizen;
                    const paragraphs = [
                      'This is to certify that <strong style="text-transform:uppercase;">' + c.fname + ' ' + c.mname + ' ' + c.lname + '</strong>, ' + getAge(c.birthdate) + ' years of age, ' + c.citizenship + ', is a ' + (c.residencyType === 'Non-Resident' ? 'non-resident transacting with' : 'bona fide resident of') + ' ' + c.blk + ' ' + c.lot + ', ' + c.address + '.',
                      selected.type === 'certificate'
                        ? 'I further certify that the above-named person is a <strong>' + empStatus + '</strong> and is well known to be of good moral character and a law-abiding citizen.'
                        : selected.type === 'clearance'
                        ? 'This further certifies that the above-named person has no derogatory or pending blotter record in Barangay Fatima I as of this date.'
                        : selected.type === 'residency'
                        ? 'This certifies continuous residency in ' + c.purok + ', Barangay Fatima I since ' + c.memberSince + '.'
                        : 'This further certifies that the above-named individual belongs to an indigent family in this Barangay and is eligible for financial, medical, or educational assistance.',
                    ];
                    const html = buildCertificateHtml(
                      getDocTitle(selected.type),
                      c,
                      council,
                      paragraphs,
                      purpose,
                      secretary ? getFullName(secretary) : 'Barangay Secretary',
                      captain ? getFullName(captain) : 'Punong Barangay'
                    );
                    printDocumentHtml(getDocTitle(selected.type), html);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
                >
                  <Printer className="h-4 w-4" />
                  Print / Save PDF
                </button>
              </div>
            </div>
            <div className="p-6 bg-white font-serif">
              <div className="flex items-center justify-center gap-4 border-b-2 border-green-900 pb-4 mb-5">
                <img src={barangaySeal} alt="Barangay Fatima I Seal" className="h-16 w-16 rounded-full object-cover" />
                <div className="text-center">
                  <div className="text-xs uppercase">Republic of the Philippines • Province of Cavite</div>
                  <div className="text-lg font-bold text-green-950">CITY OF DASMARINAS - BARANGAY FATIMA I</div>
                  <div className="text-xs text-slate-600">Office of the Punong Barangay</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:border-r border-slate-300 pr-4 space-y-2">
                  <div className="text-xs font-bold uppercase text-green-900">Barangay Council</div>
                  {council.map((o) => (
                    <div key={o.id}>
                      <div className="text-xs font-bold uppercase">{getFullName(o)}</div>
                      <div className="text-[11px] text-slate-600">{o.position}</div>
                    </div>
                  ))}
                </div>
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-center text-2xl font-bold uppercase underline">{getDocTitle(selected.type)}</h2>
                  <p className="text-sm leading-relaxed">
                    This is to certify that <strong className="uppercase">{selected.citizen.fname} {selected.citizen.mname} {selected.citizen.lname}</strong>, {getAge(selected.citizen.birthdate)} years of age, {selected.citizen.citizenship}, is a {selected.citizen.residencyType === 'Non-Resident' ? 'non-resident transacting with' : 'bona fide resident of'} {selected.citizen.blk} {selected.citizen.lot}, {selected.citizen.address}.
                  </p>
                  {selected.type === 'certificate' && (
                    <p className="text-sm leading-relaxed">
                      I further certify that the above-named person is a <strong>{empStatus}</strong> and is well known to be of good moral character and a law-abiding citizen.
                    </p>
                  )}
                  {selected.type === 'clearance' && (
                    <p className="text-sm leading-relaxed">
                      This further certifies that the above-named person has no derogatory or pending blotter record in Barangay Fatima I as of this date.
                    </p>
                  )}
                  {selected.type === 'residency' && (
                    <p className="text-sm leading-relaxed">
                      This certifies continuous residency in {selected.citizen.purok}, Barangay Fatima I since {selected.citizen.memberSince}.
                    </p>
                  )}
                  {selected.type === 'indigency' && (
                    <p className="text-sm leading-relaxed">
                      This further certifies that the above-named individual belongs to an indigent family in this Barangay and is eligible for financial, medical, or educational assistance.
                    </p>
                  )}
                  <p className="text-sm">
                    This certification is being issued upon the request of the above-named person for the purpose of: <strong className="uppercase">{purpose}</strong>.
                  </p>
                  <p className="text-sm">
                    Issued this {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-6 text-sm">
                    <div>
                      <div className="text-xs text-slate-500">Prepared by:</div>
                      <div className="font-bold uppercase mt-4">{secretary ? getFullName(secretary) : 'Barangay Secretary'}</div>
                      <div className="text-xs">Barangay Secretary</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Certified by:</div>
                      <div className="font-bold uppercase mt-4">{captain ? getFullName(captain) : 'Punong Barangay'}</div>
                      <div className="text-xs">Punong Barangay</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
                    <span>FREE OF CHARGE</span>
                    <span>NOT VALID WITHOUT OFFICIAL SEAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function SmsPage({ citizens, smsLogs, setSmsLogs, notify }) {
  const activeCitizens = citizens.filter((c) => !c.archived && c.contactNo);
  const [selectedIds, setSelectedIds] = useState(activeCitizens.map((c) => c.id));
  const [uploadedCount, setUploadedCount] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function toggleOne(id) {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  function handleExport() {
    const text = activeCitizens
      .filter((c) => selectedIds.includes(c.id))
      .map((c) => c.contactNo)
      .join('\n');
    downloadFile('barangay_fatima1_contacts.txt', text, 'text/plain');
    notify('Contacts exported to .txt');
  }

  function handleUploadTxt(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = String(reader.result || '')
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      setUploadedCount(lines.length);
      notify('Loaded ' + lines.length + ' contact number(s) from file.');
    };
    reader.readAsText(file);
  }

  function handleSend(e) {
    e.preventDefault();
    const total = uploadedCount > 0 ? uploadedCount : selectedIds.length;
    if (total === 0) {
      notify('Select or upload at least one contact.', true);
      return;
    }
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      title: title || 'Barangay Announcement',
      message: body,
      recipientCount: total,
    };
    setSmsLogs([newLog, ...smsLogs]);
    setTitle('');
    setBody('');
    setUploadedCount(0);
    notify('Announcement posted and queued for ' + total + ' recipient(s).');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-green-950">News SMS & Announcements</h1>
          <p className="text-sm text-slate-600">Export/upload citizen contact list and post barangay announcements</p>
        </div>
        <button type="button" onClick={handleExport} className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white">
          <Download className="h-4 w-4" />
          EXPORT
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 space-y-2">
          <div className="font-semibold text-sm">Barangay Citizens ({selectedIds.length} selected)</div>
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-lg">
            {activeCitizens.map((c) => (
              <label key={c.id} className="flex items-center justify-between px-3 py-2 text-sm">
                <span className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedIds.includes(c.id)} onChange={() => toggleOne(c.id)} />
                  {c.fname} {c.lname}
                </span>
                <span className="text-xs text-slate-500">{c.contactNo}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 space-y-3">
          <div className="text-xs font-medium text-slate-600">
            Upload Contact Number (.txt exported from this page):
            <label className="mt-1 flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 cursor-pointer hover:bg-slate-50">
              <Upload className="h-4 w-4 text-green-700" />
              <span>{uploadedCount > 0 ? uploadedCount + ' numbers loaded from file' : 'Choose .txt file (optional)'}</span>
              <input type="file" accept=".txt" onChange={handleUploadTxt} className="hidden" />
            </label>
          </div>
          <form onSubmit={handleSend} className="space-y-3">
            <input placeholder="Announcement Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <textarea required rows={4} placeholder="Message here..." value={body} onChange={(e) => setBody(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white">
              <Send className="h-4 w-4" />
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
        <h2 className="font-bold text-green-950 mb-3">Announcement History</h2>
        <div className="divide-y divide-slate-100">
          {smsLogs.map((log) => (
            <div key={log.id} className="py-2.5">
              <div className="flex justify-between text-sm">
                <strong>{log.title}</strong>
                <span className="text-xs text-slate-400">{log.date} • {log.recipientCount} recipients</span>
              </div>
              <p className="text-sm text-slate-600">{log.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersPage({ users, setUsers, currentUser, notify, askConfirm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Secretary');

  function handleCreate(e) {
    e.preventDefault();
    if (users.some((u) => u.username.toLowerCase() === username.trim().toLowerCase())) {
      notify('Username already exists.', true);
      return;
    }
    setUsers([
      ...users,
      {
        id: Date.now(),
        username: username.trim(),
        password: password.trim(),
        role,
        name: role === 'admin' ? username.trim() + ' (Admin)' : role + ' (' + username.trim() + ')',
        citizenId: null,
      },
    ]);
    setUsername('');
    setPassword('');
    notify('User account created.');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-950">User Accounts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="font-semibold text-sm mb-3">Create User</h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <input required placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              <option value="Secretary">Secretary</option>
              <option value="admin">Admin</option>
              <option value="Citizen">Citizen</option>
            </select>
            <button type="submit" className="w-full rounded-lg bg-green-700 py-2 text-sm font-semibold text-white">ADD</button>
          </form>
        </div>

        <div className="lg:col-span-2 rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-green-900 text-white text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3 font-medium">{u.username}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        type="button"
                        onClick={() => askConfirm('Reset Password', 'Reset password to password123?', () => {
                          setUsers(users.map((x) => (x.id === u.id ? { ...x, password: 'password123' } : x)));
                          notify('Password reset.');
                        })}
                        className="rounded border border-slate-300 px-2.5 py-1 text-xs"
                      >
                        Reset
                      </button>
                      {u.id !== currentUser.id && (
                        <button
                          type="button"
                          onClick={() => askConfirm('Delete User', 'Delete ' + u.username + '?', () => {
                            setUsers(users.filter((x) => x.id !== u.id));
                            notify('User deleted.');
                          }, true)}
                          className="rounded bg-red-50 text-red-600 px-2.5 py-1 text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PasswordPage({ currentUser, onChangePassword }) {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (oldPass !== currentUser.password) {
      setError('Old password is incorrect.');
      return;
    }
    if (newPass.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    onChangePassword(newPass);
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
  }

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-green-950">Change Password</h1>
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required type="password" placeholder="Old Password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input required type="password" placeholder="New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input required type="password" placeholder="Confirm New Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          {error && <div className="text-xs text-red-600">{error}</div>}
          <button type="submit" className="w-full rounded-lg bg-green-700 py-2 text-sm font-semibold text-white">Confirm</button>
        </form>
      </div>
    </div>
  );
}
