"use client";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./LeadList.module.css";

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  date: Date; // ISO format date string
  status: string; // This should be enum but sqllite does not support it.
  email: string;
  country: string;
}

interface LeadListProps {
  leads: Lead[];
}
const LEADS_PER_PAGE = 10;
const LeadList = ({ leads }: LeadListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredLeads = leads.filter((item) => {
    const matchesSearch =
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    item.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pageCount = Math.ceil(filteredLeads.length / LEADS_PER_PAGE);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const currentPageData = filteredLeads.slice(
    currentPage * LEADS_PER_PAGE,
    currentPage * LEADS_PER_PAGE + LEADS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>alma</div>
        <nav>
          <div className={`${styles.navItem} ${styles.navItemActive}`}>
            Leads
          </div>
          <div className={styles.navItem}>Settings</div>
        </nav>
      </div>

      <div className={styles.content}>
        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchContainer}>
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 3a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 8.5a6.5 6.5 0 1111.436 4.23l3.857 3.857a.75.75 0 11-1.061 1.061l-3.857-3.857A6.5 6.5 0 012 8.5z"
                fill="currentColor"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Reached Out">Reached Out</option>
          </select>
        </div>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>
                Name
                <svg
                  className={styles.sortIcon}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </th>
              <th className={styles.tableHeaderCell}>
                Submitted
                <svg
                  className={styles.sortIcon}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </th>
              <th className={styles.tableHeaderCell}>
                Status
                <svg
                  className={styles.sortIcon}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </th>
              <th className={styles.tableHeaderCell}>
                Country
                <svg
                  className={styles.sortIcon}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item) => (
              <tr key={item.id}>
                <td className={styles.tableCell}>
                  {item.firstName} {item.lastName}
                </td>
                <td className={styles.tableCell}>{item.status}</td>
                <td className={styles.tableCell}>
                  <span
                    className={`
                    ${styles.statusBadge}
                    ${
                      item.status === "Reached Out"
                        ? styles.statusReachedOut
                        : styles.statusPending
                    }
                  `}
                  >
                    {item.status}
                  </span>
                </td>
                <td className={styles.tableCell}>{item.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <ReactPaginate
            previousLabel="←"
            nextLabel="→"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={styles.paginationList}
            pageClassName="page-item"
            pageLinkClassName={styles.paginationLink}
            previousClassName="page-item"
            previousLinkClassName={styles.paginationLink}
            nextClassName="page-item"
            nextLinkClassName={styles.paginationLink}
            breakClassName="page-item"
            breakLinkClassName={styles.paginationLink}
            activeClassName={styles.paginationActive}
            disabledClassName={styles.paginationDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadList;
