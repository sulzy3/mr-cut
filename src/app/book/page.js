"use client";

import React, {useEffect, useState} from "react";
import {Appointment} from "@/entities/Appointment";
import {Service} from "@/entities/Service";
import {Barber} from "@/entities/Barber";
import {format} from "date-fns";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AvailableSlotsCard from "@/components/AvailableSlotsCard";
import Cookies from "js-cookie";

export default function BookPage() {
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [selectedService, setSelectedService] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({open: false, message: "", severity: "success"});

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [servicesData, barbersData] = await Promise.all([
                                                                          Service.getAll(),
                                                                          Barber.getAll()
                                                                      ]);
                setServices(servicesData);
                setBarbers(barbersData);

                // Get user data from cookies
                const userData = Cookies.get("userData");
                if (userData) {
                    const {name, phoneNumber} = JSON.parse(userData);
                    setName(name);
                    setPhone(phoneNumber);
                }
            } catch (error) {
                console.error("Error loading data:", error);
                setError("Failed to load services and barbers. Please try again later.");
                setSnackbar({
                                open: true,
                                message: "Failed to load data. Please refresh the page.",
                                severity: "error"
                            });
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const handleSubmit = async () => {
        setShowConfirmation(true);
    };

    const handleConfirmBooking = async () => {
        try {
            setIsLoading(true);

            const appointment = new Appointment({
                                                    serviceId: selectedServiceId,
                                                    barberId: selectedBarber,
                                                    date: selectedDate,
                                                    time: selectedTime,
                                                    customerName: name,
                                                    customerPhone: phone,
                                                });

            // console.log(appointment)

            await appointment.save();
            setShowConfirmation(false);
            setSnackbar({
                            open: true,
                            message: "Appointment booked successfully!",
                            severity: "success"
                        });
        } catch (error) {
            console.error("Error creating appointment:", error);
            setSnackbar({
                            open: true,
                            message: "Failed to book appointment. Please try again.",
                            severity: "error"
                        });
        } finally {
            setIsLoading(false);
        }
    };

    const handleServiceSelect = (serviceId) => {
        const service = services.find(s => s.id === serviceId);
        if (service) {
            setSelectedServiceId(serviceId);
            setSelectedService(service);
        }
    };

    const getSelectedBarber = () => {
        const barber = barbers.find((b) => b.id === selectedBarber);
        if (!barber) return null;

        return {
            id: barber.id,
            firstName: barber.firstName,
            lastName: barber.lastName,
            working_hours: barber.working_hours,
            specialties: barber.specialties,
            phone_number: barber.phone_number,
            bio: barber.bio,
            photo_url: barber.photo_url,
        };
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        try {
            return format(new Date(dateString), "PPP");
        } catch (error) {
            console.error("Error formatting date:", error);
            return dateString;
        }
    };

    return (
        <Container maxWidth="md" sx={{py: 4}}>
            <Typography
                variant="h4"
                sx={{color: "#2D5043", fontWeight: "bold", mb: 4}}
            >
                Book an Appointment
            </Typography>

            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}

            {isLoading ? (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                    <CircularProgress sx={{color: "#2D5043"}}/>
                </Box>
            ) : (
                <Stack spacing={3}>
                    <Card>
                        <CardHeader title="Your Information"/>
                        <CardContent>
                            <TextField
                                fullWidth
                                label="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                sx={{mb: 2}}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader title="Select Service"/>
                        <CardContent>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    value={selectedServiceId}
                                    onChange={(e) => handleServiceSelect(e.target.value)}
                                >
                                    {services.map((service) => (
                                        <FormControlLabel
                                            key={service.id}
                                            value={service.id}
                                            control={<Radio/>}
                                            label={`${service.name} - $${service.price}`}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader title="Select Barber"/>
                        <CardContent>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    value={selectedBarber}
                                    onChange={(e) => setSelectedBarber(e.target.value)}
                                >
                                    {barbers.map((barber) => (
                                        <FormControlLabel
                                            key={barber.id}
                                            value={barber.id}
                                            control={<Radio/>}
                                            label={barber.firstName + " " + barber.lastName}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader title="Select Date and Time"/>
                        <CardContent>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {xs: "1fr", md: "1fr 1fr"},
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    type="date"
                                    label="Date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    InputLabelProps={{shrink: true}}
                                />
                            </Box>

                            <AvailableSlotsCard
                                barberId={selectedBarber}
                                selectedDate={selectedDate}
                                onSlotSelect={(time) => setSelectedTime(time)}
                                serviceDuration={selectedService?.duration}
                            />
                        </CardContent>
                    </Card>

                    <Dialog
                        open={showConfirmation}
                        onClose={() => setShowConfirmation(false)}
                    >
                        <DialogTitle>Confirm Your Appointment</DialogTitle>
                        <DialogContent>
                            <Stack spacing={2} sx={{mt: 2}}>
                                <Typography>
                                    <strong>Service:</strong> {selectedService?.name}
                                </Typography>
                                <Typography>
                                    <strong>Price:</strong> ${selectedService?.price}
                                </Typography>
                                <Typography>
                                    <strong>Barber:</strong> {getSelectedBarber()?.firstName}{" "}
                                    {getSelectedBarber()?.lastName}
                                </Typography>
                                <Typography>
                                    <strong>Date:</strong> {formatDate(selectedDate)}
                                </Typography>
                                <Typography>
                                    <strong>Time:</strong> {selectedTime}
                                </Typography>
                                <Typography>
                                    <strong>Name:</strong> {name}
                                </Typography>
                                <Typography>
                                    <strong>Phone:</strong> {phone}
                                </Typography>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowConfirmation(false)}>Cancel</Button>
                            <Button
                                onClick={handleConfirmBooking}
                                variant="contained"
                                sx={{
                                    bgcolor: "#2D5043",
                                    "&:hover": {
                                        bgcolor: "#233D34",
                                    },
                                }}
                            >
                                Confirm Booking
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            bgcolor: "#2D5043",
                            "&:hover": {
                                bgcolor: "#233D34",
                            },
                        }}
                        fullWidth
                    >
                        Book Appointment
                    </Button>
                </Stack>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({...snackbar, open: false})}
            >
                <Alert
                    onClose={() => setSnackbar({...snackbar, open: false})}
                    severity={snackbar.severity}
                    sx={{width: '100%'}}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
