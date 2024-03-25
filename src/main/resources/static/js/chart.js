// Static modal name
const modalName = 'all-students';

// Flag to track if the modal has been added
let modalAdded = false;

const addChart = function(chartData) {
    // Ensure the modal is added only once
    if (!modalAdded) {
        addModal(chartData.whereToAdd);
        modalAdded = true;
    }
    renderChart(modalName, chartData.title, chartData.chartDetails);
}

// Creates Modal
const addModal = function(whereToAdd) {    
    if (!modalAdded) {
        $("#" + modalName + "-chart-container").append(`<canvas class="chart" id="${modalName}-chart"></canvas>`);
        let modal = `
            <div class="d-flex justify-content-end mt-5">
                <button type="button" class="btn btn-dark visualise-btn" data-toggle="modal" data-target="#${modalName}-chart-modal">Visualise</button>
            </div>
            <div class="modal fade" id="${modalName}-chart-modal">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <!-- Modal Title -->
                        <div class="modal-header">      
                            <div class="d-flex align-items-center" style="width: 100%;">
                                <h4 class="modal-title" id="${modalName}-chart-title" style="margin: auto;">Graph Title</h4>
                                <button type="button" class="close custom-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                        </div>
                        <div class="modal-body" id="${modalName}-chart-container">
                            <canvas class="chart" id="${modalName}-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>`;

        // Adds a '#' if one is not supplied
        if (whereToAdd.length > 0 && whereToAdd.charAt(0) != '#') {
            whereToAdd = "#" + whereToAdd;
        }
        $(whereToAdd).append(modal);
    }
}

const renderChart = function(modalName, title, chartDetails) {
    $('#' + modalName + '-chart-title').text(title);
    const canvas = $('#' + modalName + "-chart")[0];
    const ctx = canvas.getContext('2d');

    if (canvas.chartInstance) {
        canvas.chartInstance.config.data = chartDetails.data;
        canvas.chartInstance.config.options = chartDetails.options;
        canvas.chartInstance.update();
    } else {
        canvas.chartInstance = new Chart(ctx, {
            ...chartDetails,
            options: chartDetails.options
        });
    }
};
