"use client";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  date: Date; // ISO format date string
  status: string; // This should be enum but sqllite does not support it.
  country: string;
}

interface LeadListProps {
  leads: Lead[];
}
const LeadList = ({ leads }: LeadListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const leadsPerPage = 10;

  const filteredLeads = leads.filter((lead) => {
    const name = `${lead.firstName} ${lead.lastName}`;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const pageCount = Math.ceil(filteredLeads.length / leadsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const displayLeads = filteredLeads.slice(
    currentPage * leadsPerPage,
    currentPage * leadsPerPage + leadsPerPage
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {displayLeads.length > 0 ? (
            displayLeads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  {lead.firstName} {lead.lastName}
                </td>
                <td>
                  {new Date(lead.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{lead.status}</td>
                <td>{lead.country}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No leads found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        // style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default LeadList;
