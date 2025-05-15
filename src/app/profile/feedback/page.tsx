
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarIcon, Send } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
  return (
    <div className="flex items-center space-x-1 py-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-7 w-7 cursor-pointer transition-colors ${
            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground hover:text-amber-300'
          }`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};


export default function FeedbackPage() {
  // Placeholder state for form - in a real app, use react-hook-form or similar
  const [rating, setRating] = React.useState(0);
  const [feedbackType, setFeedbackType] = React.useState("general");
  const [comments, setComments] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", { rating, feedbackType, comments });
    // Add toast notification for submission
    alert("Thank you for your feedback! (Simulated)");
    setRating(0);
    setFeedbackType("general");
    setComments("");
  };

  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <Card className="shadow-xl bg-card">
        <CardHeader className="text-center">
          <StarIcon className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
            Share Your Feedback
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Help us improve kariGaar! Let us know about your experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <Label className="text-lg font-semibold text-card-foreground mb-1 block">Overall Rating</Label>
              <StarRatingInput rating={rating} setRating={setRating} />
            </div>

            <div>
              <Label className="text-lg font-semibold text-card-foreground mb-2 block">Feedback Type</Label>
              <RadioGroup defaultValue="general" value={feedbackType} onValueChange={setFeedbackType} className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="r1" />
                  <Label htmlFor="r1">General Platform Feedback</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="service_experience" id="r2" />
                  <Label htmlFor="r2">Specific Service Experience</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suggestion" id="r3" />
                  <Label htmlFor="r3">Suggestion / Feature Request</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="comments" className="text-lg font-semibold text-card-foreground mb-1 block">Comments</Label>
              <Textarea
                id="comments"
                placeholder="Tell us more..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base">
              <Send className="mr-2 h-5 w-5" /> Submit Feedback (Simulated)
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
