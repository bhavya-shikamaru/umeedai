import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudentCard } from "@/components/StudentCard";
import { sampleStudents, type Student } from "@/utils/mockData";
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Plus,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
}

export const Dashboard = ({ students = sampleStudents, onStudentSelect }: DashboardProps) => {
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  const [filterRisk, setFilterRisk] = useState<"all" | "high" | "medium" | "low">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (filterRisk === "all") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(s => s.risk_level === filterRisk));
    }
  }, [students, filterRisk]);

  const riskStats = {
    total: students.length,
    high: students.filter(s => s.risk_level === "high").length,
    medium: students.filter(s => s.risk_level === "medium").length,
    low: students.filter(s => s.risk_level === "low").length,
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen aurora-bg-animated">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-medium text-white mb-2">Risk Analytics Dashboard / जोखिम विश्लेषण डैशबोर्ड</h1>
            <p className="text-white/70">
              Real-time insights and trends across all students / सभी छात्रों में वास्तविक समय की अंतर्दृष्टि और रुझान
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="glass"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-white border-white/25"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Data / डेटा रीफ्रेश करें
            </Button>
            <Link to="/upload">
              <Button variant="glass" className="text-white border-white/25">
                <Plus className="h-4 w-4" />
                Add Students / छात्र जोड़ें
              </Button>
            </Link>
            <Button variant="glass" className="text-white border-white/25">
              <Download className="h-4 w-4" />
              Export Report / रिपोर्ट निर्यात करें
            </Button>
          </div>
        </div>

        {/* Risk Level Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="animate-fade-in hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">Total Students / कुल छात्र</CardTitle>
              <Users className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-white">{riskStats.total}</div>
              <p className="text-xs text-white/60">Currently enrolled / वर्तमान में नामांकित</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-lift border-l-4 border-l-risk-high">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">High Risk / उच्च जोखिम</CardTitle>
              <AlertTriangle className="h-4 w-4 text-risk-high" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-risk-high">{riskStats.high}</div>
              <p className="text-xs text-white/60">
                {((riskStats.high / riskStats.total) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-lift border-l-4 border-l-risk-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">Medium Risk / मध्यम जोखिम</CardTitle>
              <TrendingUp className="h-4 w-4 text-risk-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-risk-medium">{riskStats.medium}</div>
              <p className="text-xs text-white/60">
                {((riskStats.medium / riskStats.total) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-lift border-l-4 border-l-risk-low">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">Low Risk / कम जोखिम</CardTitle>
              <Calendar className="h-4 w-4 text-risk-low" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-risk-low">{riskStats.low}</div>
              <p className="text-xs text-white/60">
                {((riskStats.low / riskStats.total) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Insights */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift border-l-4 border-l-blue-400">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                Attendance Insights / उपस्थिति अंतर्दृष्टि
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-white/70">Average Attendance / औसत उपस्थिति:</span>
                  <span className="font-medium text-white">
                    {((students.reduce((acc, s) => acc + s.attendance_rate_30, 0) / students.length) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/70">Below 80% / 80% से कम:</span>
                  <span className="font-medium text-amber-400">
                    {students.filter(s => s.attendance_rate_30 < 0.8).length} students / छात्र
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-green-400">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                Academic Performance / शैक्षणिक प्रदर्शन
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-white/70">Average Score / औसत अंक:</span>
                  <span className="font-medium text-white">
                    {(students.reduce((acc, s) => acc + s.avg_score, 0) / students.length).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/70">Below 50 / 50 से कम:</span>
                  <span className="font-medium text-red-400">
                    {students.filter(s => s.avg_score < 50).length} students / छात्र
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-purple-400">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <AlertTriangle className="h-5 w-5 mr-2 text-purple-400" />
                Intervention Priority / हस्तक्षेप प्राथमिकता
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Immediate Action / तत्काल कार्रवाई:</span>
                  <Badge className="bg-risk-high text-white">{riskStats.high}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Monitor Closely / निकट निगरानी:</span>
                  <Badge className="bg-risk-medium text-white">{riskStats.medium}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-sm font-medium text-white flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter by Risk Level / जोखिम स्तर के अनुसार फ़िल्टर करें:
          </span>
          {["all", "high", "medium", "low"].map((risk) => (
            <Badge
              key={risk}
              className={`cursor-pointer transition-all duration-300 ${
                filterRisk === risk 
                  ? risk === "high" 
                    ? "bg-risk-high text-white" 
                    : risk === "medium"
                    ? "bg-risk-medium text-white"
                    : risk === "low"
                    ? "bg-risk-low text-white"
                    : "bg-white/30 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/20"
              }`}
              onClick={() => setFilterRisk(risk as typeof filterRisk)}
            >
              {risk.charAt(0).toUpperCase() + risk.slice(1)}
              {risk !== "all" && (
                <span className="ml-1">
                  ({risk === "high" ? riskStats.high : risk === "medium" ? riskStats.medium : riskStats.low})
                </span>
              )}
            </Badge>
          ))}
        </div>

        {/* Student Grid */}
        {filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Students Found</h3>
              <p className="text-white/60 mb-4">
                {filterRisk === "all" 
                  ? "No students have been added yet." 
                  : `No students found with ${filterRisk} risk level.`}
              </p>
              <Link to="/upload">
                <Button className="bg-white text-primary hover:bg-white/90">
                  <Plus className="h-4 w-4" />
                  Add Your First Student
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
              <div key={student.student_id} style={{ animationDelay: `${index * 100}ms` }}>
                <StudentCard
                  student={student}
                  onViewDetails={onStudentSelect}
                />
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <Card className="glass-strong border-dashed border-white/30">
            <CardContent className="py-8">
              <h3 className="text-xl font-medium text-white mb-4">
                Ready to track more students? / अधिक छात्रों को ट्रैक करने के लिए तैयार हैं? 📊
              </h3>
              <p className="text-white/70 mb-6">
                Add comprehensive analytics and intervention tracking for better outcomes / बेहतर परिणामों के लिए व्यापक विश्लेषण और हस्तक्षेप ट्रैकिंग जोड़ें
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/upload">
                  <Button className="bg-white text-primary hover:bg-white/90">
                    <Plus className="h-4 w-4" />
                    Upload Student Data / छात्र डेटा अपलोड करें
                  </Button>
                </Link>
                <Button variant="glass" className="text-white border-white/25">
                  <Download className="h-4 w-4" />
                  Download Template / टेम्पलेट डाउनलोड करें
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
