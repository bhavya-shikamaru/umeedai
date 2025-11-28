import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Calendar, 
  TrendingDown, 
  TrendingUp, 
  User,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Student {
  student_id: string;
  name: string;
  klass: string;
  attendance_rate_30: number;
  consec_absent: number;
  avg_score: number;
  last_score: number;
  last_payment_status: number;
  socioeconomic_flag: number;
  risk_level: "high" | "medium" | "low";
  risk_score: number;
  risk_factors: string[];
}

interface StudentCardProps {
  student: Student;
  onViewDetails: (student: Student) => void;
}

export const StudentCard = ({ student, onViewDetails }: StudentCardProps) => {
  const navigate = useNavigate();

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-risk-high";
      case "medium": return "bg-risk-medium";
      case "low": return "bg-risk-low";
      default: return "bg-risk-medium";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high": return <AlertTriangle className="h-4 w-4" />;
      case "medium": return <TrendingDown className="h-4 w-4" />;
      case "low": return <TrendingUp className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleViewDetails = () => {
    onViewDetails(student);
    navigate(`/student/${student.student_id}`);
  };

  return (
    <Card className="hover-lift animate-fade-in group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-medium text-white">{student.name}</CardTitle>
              <p className="text-sm text-white/60">Class {student.klass} • ID: {student.student_id}</p>
            </div>
          </div>
          <Badge className={`${getRiskColor(student.risk_level)} text-white border-none`}>
            {getRiskIcon(student.risk_level)}
            <span className="ml-1">{student.risk_level.charAt(0).toUpperCase() + student.risk_level.slice(1)}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Risk Score */}
        <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
          <span className="text-sm font-medium text-white/80">Dropout Risk / ड्रॉपआउट जोखिम</span>
          <span className={`text-lg font-medium ${getRiskColor(student.risk_level).replace('bg-', 'text-')}`}>
            {(student.risk_score * 100).toFixed(1)}%
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 p-2 bg-white/10 rounded-xl">
            <Calendar className="h-4 w-4 text-blue-300" />
            <div>
              <p className="text-xs text-white/60">Attendance</p>
              <p className="text-sm font-medium text-white">{(student.attendance_rate_30 * 100).toFixed(0)}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-2 bg-white/10 rounded-xl">
            <TrendingUp className="h-4 w-4 text-green-300" />
            <div>
              <p className="text-xs text-white/60">Avg Score</p>
              <p className="text-sm font-medium text-white">{student.avg_score.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Risk Factors Preview */}
        {student.risk_factors.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-white/60">Risk Factors:</p>
            <div className="flex flex-wrap gap-1">
              {student.risk_factors.slice(0, 2).map((factor, index) => (
                <span 
                  key={index}
                  className="text-xs bg-white/15 px-2 py-1 rounded-full text-white/80"
                >
                  {factor}
                </span>
              ))}
              {student.risk_factors.length > 2 && (
                <span className="text-xs text-white/50">
                  +{student.risk_factors.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button 
          onClick={handleViewDetails}
          variant="glass" 
          className="w-full text-white border-white/25 group-hover:bg-white group-hover:text-primary"
        >
          <Heart className="h-4 w-4" />
          View Details / विवरण देखें
        </Button>
      </CardContent>
    </Card>
  );
};
