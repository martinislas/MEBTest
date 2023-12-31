package job

import (
	"encoding/json"
	"net/http"
	"strconv"

	"cloud.google.com/go/datastore"
	"github.com/OwenJacob/mebresources/meb/ds"
	"github.com/OwenJacob/mebresources/meb/model"
	"github.com/julienschmidt/httprouter"
)

func GetJobs(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()
	var err error

	// get jobs by industry
	// get jobs by location

	query := datastore.NewQuery("job").Filter("active =", true).Order("-created")

	var jobs []*model.Job
	keys, err := ds.Client.GetAll(ctx, query, &jobs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for i, key := range keys {
		keyName := strconv.FormatInt(key.ID, 10)
		jobs[i].ID = keyName
		jobs[i].ApplicantCount = len(jobs[i].ApplicantKeys)
		// Don't leak applicant ID's on public endpoint
		jobs[i].ApplicantKeys = []string{}

		locationKey := datastore.NameKey("location", jobs[i].LocationKey, nil)
		var location model.Location
		if err := ds.Client.Get(ctx, locationKey, &location); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		industryKey := datastore.NameKey("industry", jobs[i].IndustryKey, nil)
		var industry model.Industry
		if err := ds.Client.Get(ctx, industryKey, &industry); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		jobs[i].Location = location.DisplayName
		jobs[i].Industry = industry.DisplayName
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(jobs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func GetJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	jobID := ps.ByName("id")
	id, err := strconv.ParseInt(jobID, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	key := datastore.IDKey("job", id, nil)
	getJob := new(model.Job)
	err = ds.Client.Get(ctx, key, getJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	getJob.ID = jobID
	getJob.ApplicantCount = len(getJob.ApplicantKeys)
	// Don't leak applicant ID's on public endpoint
	getJob.ApplicantKeys = []string{}

	locationKey := datastore.NameKey("location", getJob.LocationKey, nil)
	var location model.Location
	if err := ds.Client.Get(ctx, locationKey, &location); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	industryKey := datastore.NameKey("industry", getJob.IndustryKey, nil)
	var industry model.Industry
	if err := ds.Client.Get(ctx, industryKey, &industry); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	getJob.Location = location.DisplayName
	getJob.Industry = industry.DisplayName

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(getJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
