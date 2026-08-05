/* चंद्रकैलाश Tours & Travels - Excel Lead Exporter */

import { state } from '../context/state.js';

export function exportToExcel() {
    if (!window.XLSX) {
        alert('Excel Export library (SheetJS) is loading, please try again in a moment.');
        return;
    }
    const data = (state.bookings || []).map((b, idx) => ({
        'SR No.': idx + 1,
        'Customer Name': b.name,
        'Mobile Number': b.phone,
        'Tour Package': b.destination,
        'Status': b.status || 'New',
        'Inquiry Date': b.createdAt || '',
        'Customer Message': b.message || '',
        'Admin Notes': b.adminNotes || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiries');
    
    const fileName = `Chandrakailash_Tours_Leads_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
}
