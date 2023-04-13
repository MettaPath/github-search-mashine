import * as React from 'react';

export function Info() {
    return (
        <div className="text-sm text-yellow-400 bg-gray-500 rounded p-7 mb-5 shadow-md">
            <p className="mb-3">
                Please sign in
                to use the function of working with your selection.
                </p>
                <div>
                    <p>- adding a repository to favorites</p>
                    <p>- quick access to favorite repositories</p>
                    <p>- sorting and filtering favorites</p>
                    <p>- notes on favorites</p>
                </div>
        </div>
    );
}
