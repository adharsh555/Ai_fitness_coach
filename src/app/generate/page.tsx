"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, ChevronRight, ChevronLeft, Save, RefreshCcw, Volume2, Share2, Dumbbell, Utensils, Info } from "lucide-react";
import { generatePlan } from "../actions";

const steps = [
    { id: 1, title: "Personal Details" },
    { id: 2, title: "Goals & Fitness" },
    { id: 3, title: "Preferences" },
];

export default function GeneratePage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        goal: "Weight Loss",
        level: "Beginner",
        location: "Gym",
        diet: "Non-Veg",
        medical: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const result = await generatePlan(formData);
            setPlan(result);
        } catch (error) {
            console.error(error);
            alert("Failed to generate plan. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem("ai-fitness-plan");
        if (saved) {
            try {
                setPlan(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load saved plan", e);
            }
        }
    }, []);

    if (plan) {
        return <PlanView plan={plan} userData={formData} onRegenerate={() => setPlan(null)} />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <div className="mb-8 text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Create Your Plan</h1>
                    <div className="flex justify-center gap-2">
                        {steps.map((s) => (
                            <div key={s.id} className={`h-2 w-12 rounded-full transition-colors ${step >= s.id ? "bg-primary" : "bg-muted"}`} />
                        ))}
                    </div>
                </div>

                <Card className="border-muted/50 shadow-xl">
                    <CardContent className="p-6 md:p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {step === 1 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-semibold mb-6">Tell us about yourself</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Name</Label>
                                                <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="age">Age</Label>
                                                <Input id="age" name="age" type="number" placeholder="25" value={formData.age} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Gender</Label>
                                            <Select onValueChange={(v) => handleSelectChange("gender", v)} value={formData.gender}>
                                                <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="height">Height (cm)</Label>
                                                <Input id="height" name="height" type="number" placeholder="175" value={formData.height} onChange={handleInputChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="weight">Weight (kg)</Label>
                                                <Input id="weight" name="weight" type="number" placeholder="70" value={formData.weight} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-semibold mb-6">Your Goals</h2>
                                        <div className="space-y-2">
                                            <Label htmlFor="goal">Fitness Goal</Label>
                                            <Select onValueChange={(v) => handleSelectChange("goal", v)} value={formData.goal}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                                                    <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                                                    <SelectItem value="Endurance">Endurance</SelectItem>
                                                    <SelectItem value="Flexibility">Flexibility</SelectItem>
                                                    <SelectItem value="Maintenance">General Maintenance</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="level">Experience Level</Label>
                                            <Select onValueChange={(v) => handleSelectChange("level", v)} value={formData.level}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Workout Location</Label>
                                            <Select onValueChange={(v) => handleSelectChange("location", v)} value={formData.location}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Gym">Gym</SelectItem>
                                                    <SelectItem value="Home">Home</SelectItem>
                                                    <SelectItem value="Outdoor">Outdoor</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-semibold mb-6">Preferences</h2>
                                        <div className="space-y-2">
                                            <Label htmlFor="diet">Dietary Preference</Label>
                                            <Select onValueChange={(v) => handleSelectChange("diet", v)} value={formData.diet}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Non-Veg">Non-Veg</SelectItem>
                                                    <SelectItem value="Veg">Vegetarian</SelectItem>
                                                    <SelectItem value="Vegan">Vegan</SelectItem>
                                                    <SelectItem value="Keto">Keto</SelectItem>
                                                    <SelectItem value="Paleo">Paleo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="medical">Medical Conditions / Injuries (Optional)</Label>
                                            <Input id="medical" name="medical" placeholder="None" value={formData.medical} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex justify-between mt-8">
                            {step > 1 ? (
                                <Button variant="outline" onClick={prevStep}><ChevronLeft className="mr-2 h-4 w-4" /> Back</Button>
                            ) : <div></div>}

                            {step < steps.length ? (
                                <Button onClick={nextStep}>Next <ChevronRight className="ml-2 h-4 w-4" /></Button>
                            ) : (
                                <Button onClick={handleGenerate} disabled={loading} className="w-full sm:w-auto min-w-[140px]">
                                    {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Generate Plan"}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function PlanView({ plan, userData, onRegenerate }: { plan: any, userData: any, onRegenerate: () => void }) {
    const [activeTab, setActiveTab] = useState<'workout' | 'diet'>('workout');
    const [showImage, setShowImage] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            alert("TTS not supported in this browser.");
        }
    };

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        setShowImage(true);
    };

    const savePlan = () => {
        localStorage.setItem("ai-fitness-plan", JSON.stringify(plan));
        alert("Plan saved successfully to this device!");
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text("AI Fitness Coach - Personalized Plan", 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated for: ${userData.name || 'User'} | Goal: ${userData.goal}`, 14, 30);

        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);
        doc.text(`Motivation: "${plan.motivation}"`, 14, 40);

        let yPos = 55;

        // Workout Section
        doc.setFontSize(16);
        doc.setTextColor(0, 51, 102);
        doc.text("Workout Strategy", 14, yPos);
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(0);
        const splitSummary = doc.splitTextToSize(plan.workoutPlan.summary, 180);
        doc.text(splitSummary, 14, yPos);
        yPos += splitSummary.length * 6 + 10;

        const workoutData = plan.workoutPlan.schedule.map((day: any) => [
            day.day,
            day.focus,
            day.exercises.map((e: any) => `${e.name} (${e.sets}x${e.reps})`).join("\n")
        ]);

        (doc as any).autoTable({
            startY: yPos,
            head: [['Day', 'Focus', 'Exercises']],
            body: workoutData,
            theme: 'grid',
            headStyles: { fillColor: [0, 51, 102] },
            styles: { fontSize: 10, cellPadding: 3 },
        });

        yPos = (doc as any).lastAutoTable.finalY + 20;

        // Diet Section
        if (yPos > 240) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(16);
        doc.setTextColor(0, 100, 0);
        doc.text("Diet Strategy", 14, yPos);
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(0);
        const dietSummary = doc.splitTextToSize(plan.dietPlan.summary, 180);
        doc.text(dietSummary, 14, yPos);
        yPos += dietSummary.length * 6 + 10;

        const dietData = plan.dietPlan.meals.map((meal: any) => [
            meal.type,
            meal.options.join("\n")
        ]);

        (doc as any).autoTable({
            startY: yPos,
            head: [['Meal', 'Options']],
            body: dietData,
            theme: 'grid',
            headStyles: { fillColor: [0, 100, 0] },
            styles: { fontSize: 10, cellPadding: 3 },
        });

        doc.save("my-fitness-plan.pdf");
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6">
            <Dialog open={showImage} onOpenChange={setShowImage}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Visualizing: {selectedItem}</DialogTitle>
                        <DialogDescription>
                            AI-generated representation of {selectedItem}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-4">
                        {selectedItem && (
                            <img
                                src={`https://image.pollinations.ai/prompt/${encodeURIComponent(selectedItem + " photorealistic, high quality, 4k")}`}
                                alt={selectedItem}
                                className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[400px]"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <div className="max-w-5xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Your Personalized Plan</h1>
                        <p className="text-muted-foreground">{plan.motivation}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => speak(activeTab === 'workout' ? plan.workoutPlan.summary : plan.dietPlan.summary)} title="Read Summary"><Volume2 className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" onClick={savePlan} title="Save Plan"><Save className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" onClick={downloadPDF} title="Download PDF"><Share2 className="h-4 w-4" /></Button>
                        <Button variant="outline" onClick={onRegenerate}><RefreshCcw className="mr-2 h-4 w-4" /> Regenerate</Button>
                    </div>
                </header>

                <div className="flex space-x-4 border-b border-border pb-2">
                    <button
                        onClick={() => setActiveTab('workout')}
                        className={`flex items-center gap-2 pb-2 px-4 font-medium transition-colors ${activeTab === 'workout' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <Dumbbell className="h-5 w-5" /> Workout
                    </button>
                    <button
                        onClick={() => setActiveTab('diet')}
                        className={`flex items-center gap-2 pb-2 px-4 font-medium transition-colors ${activeTab === 'diet' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <Utensils className="h-5 w-5" /> Diet
                    </button>
                </div>

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'workout' && (
                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">Strategy</h2>
                                    <p className="text-muted-foreground">{plan.workoutPlan.summary}</p>
                                </CardContent>
                            </Card>
                            <div className="grid gap-6 md:grid-cols-2">
                                {plan.workoutPlan.schedule.map((day: any, i: number) => (
                                    <Card key={i} className="hover:border-primary/50 transition-colors">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-bold text-lg">{day.day}</h3>
                                                <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded">{day.focus}</span>
                                            </div>
                                            <ul className="space-y-3">
                                                {day.exercises.map((ex: any, j: number) => (
                                                    <li
                                                        key={j}
                                                        className="flex justify-between items-start text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0 cursor-pointer hover:bg-muted/50 p-1 rounded transition-colors group"
                                                        onClick={() => handleItemClick(ex.name)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Info className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            <div>
                                                                <div className="font-medium group-hover:text-primary transition-colors">{ex.name}</div>
                                                                <div className="text-muted-foreground text-xs">{ex.sets} sets x {ex.reps}</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">{ex.rest}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'diet' && (
                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">Nutrition Strategy</h2>
                                    <p className="text-muted-foreground">{plan.dietPlan.summary}</p>
                                </CardContent>
                            </Card>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {plan.dietPlan.meals.map((meal: any, i: number) => (
                                    <Card key={i}>
                                        <CardContent className="p-6">
                                            <h3 className="font-bold text-lg mb-4 text-primary">{meal.type}</h3>
                                            <ul className="space-y-2">
                                                {meal.options.map((opt: string, j: number) => (
                                                    <li
                                                        key={j}
                                                        className="text-sm bg-secondary/50 p-2 rounded flex items-center gap-2 cursor-pointer hover:bg-secondary transition-colors"
                                                        onClick={() => handleItemClick(opt)}
                                                    >
                                                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                                        {opt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Coach Tips</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {plan.tips.map((tip: string, i: number) => (
                            <div key={i} className="flex gap-3 items-start bg-accent/20 p-4 rounded-lg">
                                <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</div>
                                <p className="text-sm">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
