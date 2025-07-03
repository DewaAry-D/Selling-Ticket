const { ticketList } = require('../model/ticket.model');


// function seedDummyTickets(ticketList) {
//     const now = new Date();
//     const day = (n) => new Date(now.getTime() + n * 24 * 60 * 60 * 1000);

//     ticketList.append(1, 101, 201, 'Tech Conference', 'EVT1001', 'Konferensi teknologi terkini.', 'Teknologi', 'VIP', 'Batch 1', day(-2), day(5), 50000, 100, 90, day(1), day(2), 'assets/image.jpg', 'Jakarta');
//     ticketList.append(2, 102, 202, 'Music Festival', 'EVT1002', 'Festival musik tahunan.', 'Musik', 'Reguler', 'Batch 1', day(-1), day(3), 75000, 200, 150, day(1), day(3), 'assets/image.jpg', 'Bandung');
//     ticketList.append(3, 103, 203, 'Art Expo', 'EVT1003', 'Pameran seni modern.', 'Seni', 'Reguler', 'Batch 1', day(-3), day(4), 60000, 80, 50, day(2), day(4), 'assets/image.jpg', 'Yogyakarta');
//     ticketList.append(4, 104, 204, 'Startup Meetup', 'EVT1004', 'Pertemuan startup lokal.', 'Teknologi', 'Reguler', 'Batch 1', day(-2), day(5), 45000, 60, 20, day(1), day(2), 'assets/image.jpg', 'Online');
//     ticketList.append(5, 105, 205, 'Marathon Run', 'EVT1005', 'Lomba lari marathon.', 'Olahraga', 'Reguler', 'Batch 1', day(-1), day(6), 80000, 300, 300, day(3), day(3), 'assets/image.jpg', 'Surabaya');
//     ticketList.append(6, 106, 206, 'Photography Talk', 'EVT1006', 'Diskusi fotografi.', 'Seni', 'VIP', 'Batch 1', day(-3), day(2), 30000, 50, 10, day(1), day(1), 'assets/image.jpg', 'Online');
//     ticketList.append(7, 107, 207, 'Code Jam', 'EVT1007', 'Kompetisi coding.', 'Teknologi', 'Reguler', 'Batch 1', day(-5), day(2), 70000, 120, 0, day(1), day(2), 'assets/image.jpg', 'Malang');
//     ticketList.append(8, 108, 208, 'Jazz Night', 'EVT1008', 'Konser jazz malam hari.', 'Musik', 'Reguler', 'Batch 1', day(-1), day(4), 90000, 100, 75, day(2), day(2), 'assets/image.jpg', 'Denpasar');
//     ticketList.append(9, 109, 209, 'Design Workshop', 'EVT1009', 'Workshop desain grafis.', 'Seni', 'VIP', 'Batch 2', day(-2), day(5), 55000, 70, 65, day(1), day(1), 'assets/image.jpg', 'Online');
//     ticketList.append(10, 110, 210, 'Soccer Match', 'EVT1010', 'Pertandingan sepak bola.', 'Olahraga', 'Offline', 'Batch 2', day(-1), day(6), 100000, 500, 420, day(2), day(2), 'assets/image.jpg', 'Makassar');
//     ticketList.append(11, 111, 211, 'Cyber Security Talk', 'EVT1011', 'Webinar keamanan siber.', 'Teknologi', 'Online', 'Batch 2', day(-3), day(3), 40000, 90, 85, day(1), day(2), 'assets/image.jpg', 'Online');
//     ticketList.append(12, 112, 212, 'Indie Concert', 'EVT1012', 'Konser musik indie.', 'Musik', 'Offline', 'Batch 2', day(-4), day(4), 85000, 150, 130, day(2), day(2), 'assets/image.jpg', 'Semarang');
//     ticketList.append(13, 113, 213, 'Drawing Contest', 'EVT1013', 'Lomba menggambar anak.', 'Seni', 'Offline', 'Batch 2', day(-2), day(2), 20000, 40, 35, day(1), day(1), 'assets/image.jpg', 'Bali');
//     ticketList.append(14, 114, 214, 'Yoga Class', 'EVT1014', 'Kelas yoga outdoor.', 'Olahraga', 'Offline', 'Batch 2', day(-2), day(5), 35000, 60, 50, day(2), day(2), 'assets/image.jpg', 'Bogor');
//     ticketList.append(15, 115, 215, 'AI Seminar', 'EVT1015', 'Seminar tentang AI.', 'Teknologi', 'Online', 'Batch 2', day(-1), day(4), 65000, 110, 90, day(1), day(1), 'assets/image.jpg', 'Online');
//     ticketList.append(16, 116, 216, 'Classical Music', 'EVT1016', 'Konser musik klasik.', 'Musik', 'Offline', 'Batch 2', day(-3), day(6), 95000, 130, 100, day(2), day(2), 'assets/image.jpg', 'Solo');

//     console.log("Data ticket telah tersedia")
// }

function seedDummyTickets(ticketList) {
    const now = new Date();
    const day = (n) => new Date(now.getTime() + n * 24 * 60 * 60 * 1000);

    ticketList.append(1, 101, 201, 'Tech Conference', 'EVT1001', 'Konferensi teknologi terkini.', 'Education', 'VIP', 'Batch 1', day(-2), day(5), 50000, 100, 90, day(1), day(2), 'assets/image.jpg', 'Jakarta');
    ticketList.append(2, 102, 202, 'Music Festival', 'EVT1002', 'Festival musik tahunan.', 'Music', 'Reguler', 'Batch 1', day(-1), day(3), 75000, 200, 150, day(1), day(3), 'assets/image.jpg', 'Bandung');
    ticketList.append(3, 103, 203, 'Art Expo', 'EVT1003', 'Pameran seni modern.', 'Culture', 'Reguler', 'Batch 1', day(-3), day(4), 60000, 80, 50, day(2), day(4), 'assets/image.jpg', 'Yogyakarta');
    ticketList.append(4, 104, 204, 'Startup Meetup', 'EVT1004', 'Pertemuan startup lokal.', 'Education', 'Reguler', 'Batch 1', day(-2), day(5), 45000, 60, 20, day(1), day(2), 'assets/image.jpg', 'Online');
    ticketList.append(5, 105, 205, 'Marathon Run', 'EVT1005', 'Lomba lari marathon.', 'Sport', 'Reguler', 'Batch 1', day(-1), day(6), 80000, 300, 300, day(3), day(3), 'assets/image.jpg', 'Surabaya');
    ticketList.append(6, 106, 206, 'Photography Talk', 'EVT1006', 'Diskusi fotografi.', 'Culture', 'VIP', 'Batch 1', day(-3), day(2), 30000, 50, 10, day(1), day(1), 'assets/image.jpg', 'Online');
    ticketList.append(7, 107, 207, 'Code Jam', 'EVT1007', 'Kompetisi coding.', 'Education', 'Reguler', 'Batch 1', day(-5), day(2), 70000, 120, 0, day(1), day(2), 'assets/image.jpg', 'Malang');
    ticketList.append(8, 108, 208, 'Jazz Night', 'EVT1008', 'Konser jazz malam hari.', 'Music', 'Reguler', 'Batch 1', day(-1), day(4), 90000, 100, 75, day(2), day(2), 'assets/image.jpg', 'Denpasar');
    ticketList.append(9, 109, 209, 'Design Workshop', 'EVT1009', 'Workshop desain grafis.', 'Culture', 'VIP', 'Batch 2', day(-2), day(5), 55000, 70, 65, day(1), day(1), 'assets/image.jpg', 'Online');
    ticketList.append(10, 110, 210, 'Soccer Match', 'EVT1010', 'Pertandingan sepak bola.', 'Sport', 'Offline', 'Batch 2', day(-1), day(6), 100000, 500, 420, day(2), day(2), 'assets/image.jpg', 'Makassar');
    ticketList.append(11, 111, 211, 'Cyber Security Talk', 'EVT1011', 'Webinar keamanan siber.', 'Education', 'Online', 'Batch 2', day(-3), day(3), 40000, 90, 85, day(1), day(2), 'assets/image.jpg', 'Online');
    ticketList.append(12, 112, 212, 'Indie Concert', 'EVT1012', 'Konser musik indie.', 'Music', 'Offline', 'Batch 2', day(-4), day(4), 85000, 150, 130, day(2), day(2), 'assets/image.jpg', 'Semarang');
    ticketList.append(13, 113, 213, 'Drawing Contest', 'EVT1013', 'Lomba menggambar anak.', 'Culture', 'Offline', 'Batch 2', day(-2), day(2), 20000, 40, 35, day(1), day(1), 'assets/image.jpg', 'Bali');
    ticketList.append(14, 114, 214, 'Yoga Class', 'EVT1014', 'Kelas yoga outdoor.', 'Sport', 'Offline', 'Batch 2', day(-2), day(5), 35000, 60, 50, day(2), day(2), 'assets/image.jpg', 'Bogor');
    ticketList.append(15, 115, 215, 'AI Seminar', 'EVT1015', 'Seminar tentang AI.', 'Education', 'Online', 'Batch 2', day(-1), day(4), 65000, 110, 90, day(1), day(1), 'assets/image.jpg', 'Online');
    ticketList.append(16, 116, 216, 'Classical Music', 'EVT1016', 'Konser musik klasik.', 'Music', 'Offline', 'Batch 2', day(-3), day(6), 95000, 130, 100, day(2), day(2), 'assets/image.jpg', 'Solo');

    console.log("Data ticket telah tersedia")
}


module.exports = {
    seedDummyTickets
}
