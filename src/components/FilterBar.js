import React from 'react';
import { PRIORITIES } from '../data';

const FilterBar = ({ searchTerm, onSearchChange, filterPriority, onFilterChange }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label htmlFor="search">Tìm kiếm: </label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ marginRight: '15px' }}
      />
      
      <label htmlFor="priority">Mức ưu tiên: </label>
      <select id="priority" value={filterPriority} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="Tất cả">Tất cả</option>
        {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  );
};

export default FilterBar;