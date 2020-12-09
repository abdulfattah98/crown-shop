import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName, sub }) => (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div className="row align-items-center ">
            <div className="col-lg-6 col-12 col-md-8 pl-0">
                <div className="form-group">
                    <label>{sub ? 'Sub Category Name' : 'Category Name'}</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        autoFocus
                        required
                    />
                </div>
            </div>
            <div className="col-4 pl-0 pl-md-3 mt-3">
                <button className="form-save-button add-category">Save</button>
            </div>
        </div>
    </form>
);

export default CategoryForm;
