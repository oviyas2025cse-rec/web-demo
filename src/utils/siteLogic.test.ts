import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeEnquiryInput,
  validateEnquiryInput,
  filterProjectsByCategory,
  wrapIndex,
  clampZoom,
  formatPhotoCaption,
  parseRouteFromPathname,
  getPathForRoute,
  buildRouteUrl,
  getPageTitle,
} from './siteLogic';

test('sanitizeEnquiryInput trims whitespace and normalizes email case', () => {
  const clean = sanitizeEnquiryInput({
    name: '  Ahmad   Zulkifli  ',
    email: '  ENQUIRY@Example.COM ',
    phone: ' +6011   5555 7677 ',
    subject: '  ELV   System Upgrade ',
    message: '  We need a SMATV 4K UHD upgrade for our condominium.  ',
  });
  assert.equal(clean.name, 'Ahmad Zulkifli');
  assert.equal(clean.email, 'enquiry@example.com');
  assert.equal(clean.phone, '+6011 5555 7677');
  assert.equal(clean.subject, 'ELV System Upgrade');
  assert.equal(clean.message, 'We need a SMATV 4K UHD upgrade for our condominium.');
});

test('validateEnquiryInput rejects empty or malformed fields with descriptive errors', () => {
  const empty = validateEnquiryInput({
    name: '',
    email: 'not-an-email',
    phone: '123',
    subject: 'Hi',
    message: 'Short',
  });
  assert.equal(empty.valid, false);
  assert.ok(empty.errors.name);
  assert.ok(empty.errors.email);
  assert.ok(empty.errors.phone);
  assert.ok(empty.errors.subject);
  assert.ok(empty.errors.message);
});

test('validateEnquiryInput accepts valid Malaysian corporate enquiry', () => {
  const valid = validateEnquiryInput({
    name: 'Lim Wei Jian',
    email: 'weijian@johorproperties.my',
    phone: '+60 11 5555 7677',
    subject: 'CCTV & Access Control Quotation',
    message: 'Requesting a site survey for IP surveillance and barrier gate installation in Johor Bahru.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('filterProjectsByCategory returns all items or exact category subset', () => {
  const sample = [
    { id: '1', category: 'Hotels & Resorts', src: '/a.jpg', caption: 'A' },
    { id: '2', category: 'Hospitals', src: '/b.jpg', caption: 'B' },
    { id: '3', category: 'Hospitals', src: '/c.jpg', caption: 'C' },
  ];
  assert.equal(filterProjectsByCategory(sample, 'All').length, 3);
  assert.equal(filterProjectsByCategory(sample, 'Hospitals').length, 2);
  assert.equal(filterProjectsByCategory(sample, 'Company').length, 0);
});

test('wrapIndex wraps safely in both forward and backward directions', () => {
  assert.equal(wrapIndex(0, -1, 5), 4);
  assert.equal(wrapIndex(4, 1, 5), 0);
  assert.equal(wrapIndex(2, 1, 5), 3);
  assert.equal(wrapIndex(0, 1, 0), 0);
});

test('clampZoom keeps zoom strictly within bounds', () => {
  assert.equal(clampZoom(0.5, 1, 3), 1);
  assert.equal(clampZoom(2.25, 1, 3), 2.25);
  assert.equal(clampZoom(4.5, 1, 3), 3);
});

test('formatPhotoCaption preserves technical acronyms and handles WhatsApp filenames cleanly', () => {
  assert.equal(
    formatPhotoCaption('AFTER-NEW-BATTERY-UPS-VOLTAGE.jpg', 'Condominium & Apartments', 0),
    'After New Battery UPS Voltage'
  );
  assert.equal(
    formatPhotoCaption('CCTV-NETWORK-CABLE-LAY-1.jpg', 'Shopping Complex', 0),
    'CCTV Network Cable Lay 1'
  );
  assert.equal(
    formatPhotoCaption('WhatsApp-Image-2024-12-05-at-18.44.55_bcdd89db.jpg', 'Hospitals', 2),
    'Hospitals Field Documentation #3'
  );
});

test('parseRouteFromPathname maps clean and legacy WordPress paths to 5 routes', () => {
  assert.equal(parseRouteFromPathname('/'), 'home');
  assert.equal(parseRouteFromPathname('/about'), 'about');
  assert.equal(parseRouteFromPathname('/about-us/'), 'about');
  assert.equal(parseRouteFromPathname('/services/'), 'services');
  assert.equal(parseRouteFromPathname('/projects'), 'projects');
  assert.equal(parseRouteFromPathname('/contact-us'), 'contact');
  assert.equal(parseRouteFromPathname('/unknown-path'), 'home');
});

test('buildRouteUrl and getPageTitle construct valid URLs and titles', () => {
  assert.equal(getPathForRoute('services'), '/services');
  assert.equal(buildRouteUrl('services', 'service-elv'), '/services#service-elv');
  assert.equal(buildRouteUrl('projects', '#gallery'), '/projects#gallery');
  assert.equal(buildRouteUrl('home'), '/');
  assert.ok(getPageTitle('about').includes('NIMAI ENGINEERING'));
});

