package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"log"
	"math/rand"
	"net/http"
	"strconv"
)


// Car struct (Model)
type Car struct {
	No          string  `json:"No"`
	VinNumber   string  `json:"vinNumber"`
	Model       string  `json:"model"`
	Make      	string  `json:"make"`
	Year      	string  `json:"year"`
	MSRP      	string  `json:"MSRP"`
	Status  	string  `json:"Status"`
	Booked  	string  `json:"Booked"`
	Listed  	string  `json:"Listed"`

}


// Init cars var as a slice Car struct
var cars []Car

// Get all cars
func getCars(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	log.Println("hehehe", w.Header())
	_ = json.NewEncoder(w).Encode(cars)
}

// Get single car
func getCar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) // Gets params
	// Loop through books and find one with the id from the params
	for _, item := range cars {
		if item.No == params["No"] {
			_ = json.NewEncoder(w).Encode(item)
			return
		}
	}
	_ = json.NewEncoder(w).Encode(&Car{})
}

// Add new car
func createCar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var car Car
	_ = json.NewDecoder(r.Body).Decode(&car)
	car.No = strconv.Itoa(rand.Intn(100000000)) // Mock ID - not safe
	cars = append(cars, car)
	_ = json.NewEncoder(w).Encode(car)
}

// Update car
func updateCar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range cars {
		if item.No == params["No"] {
			cars = append(cars[:index], cars[index+1:]...)
			var car Car
			_ = json.NewDecoder(r.Body).Decode(cars)
			car.No = params["id"]
			cars = append(cars, car)
			_ = json.NewEncoder(w).Encode(car)
			return
		}
	}
}

// Delete car
func deleteCar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range cars {
		if item.No == params["No"] {
			cars = append(cars[:index], cars[index+1:]...)
			break
		}
	}
	_ = json.NewEncoder(w).Encode(cars)
}

func homeLink(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Welcome home!")
}
// Handle cors error
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("Executing middleware", r.Method)
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
		if r.Method == "OPTIONS" {
			log.Println("setting Access-Control-Allow-Origin")
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers:", "Origin, Content-Type, X-Auth-Token, Authorization")
			w.Header().Set("Content-Type", "application/json")
			return
		}
		next.ServeHTTP(w, r)
		log.Println("Executing middleware again")
	})
}


// Main function
func main() {
	// Init router
	r := mux.NewRouter()
	r.HandleFunc("/", homeLink)
	//

	// Hardcoded data - @todo: add database
	cars = append(cars, Car{
		No: "1",
		VinNumber: "SNJKFNJKERNJK3134FDA2",
		Model: "320i",
		Make:"BMW",
		Year:"2013",
		MSRP:"147000",
		Status:"Ordered",
		Booked:"y",
		Listed:"n", })
	cars = append(cars, Car{
		No:"2",
		VinNumber: "SSNJ3JN1KNKWCNSK",
		Model: "Camry",
		Make:"Toyota",
		Year:"2014",
		MSRP:"120000",
		Status:"in stock",
		Booked:"y",
		Listed:"n",
		})
	cars = append(cars, Car{
		No:"3",
		VinNumber: "CMKASLFM4KMSFKSK",
		Model: "Focus",
		Make:"Ford",
		Year:"2016",
		MSRP:"130000",
		Status:"Ordered",
		Booked:"n",
		Listed:"y",
	})
	cars = append(cars, Car{
		No:"4",
		VinNumber: "SDFMK4MKVCSAMKKSS",
		Model: "Civic",
		Make:"Honda",
		Year:"2016",
		MSRP:"140000",
		Status:"sold",
		Booked:"n",
		Listed:"n",
	})
	// Route handles & endpoints

	r.HandleFunc("/cars", getCars).Methods("GET")
	r.HandleFunc("/cars/{No}", getCar).Methods("GET")
	r.HandleFunc("/cars", createCar).Methods("POST")
	r.HandleFunc("/cars/{No}", updateCar).Methods("PUT")
	r.HandleFunc("/cars/{No}", deleteCar).Methods("DELETE")

	r.Use(mux.CORSMethodMiddleware(r))

	// Start server
	log.Fatal(http.ListenAndServe(":8000", cors.Default().Handler(r)))
}