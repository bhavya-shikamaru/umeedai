import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StudentCard } from "@/components/StudentCard";
import { 
  Search, 
  Filter, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";
import { type Student } from "@/utils/mockData";

interface StudentsProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
}

export const Students = ({ students, onStudentSelect }: StudentsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [classFilter, setClassFilter] = useState<string>("all");

  const uniqueClasses = useMemo(() => {
    const classes = [...new Set(students.map(s => s.klass))].sort();
    return classes;
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.klass.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRisk = riskFilter === "all" || student.risk_level === riskFilter;
      const matchesClass = classFilter === "all" || student.klass === classFilter;
      
      return matchesSearch && matchesRisk && matchesClass;
    });
  }, [students, searchTerm, riskFilter, classFilter]);

  const stats = {
    total: students.length,
    high: students.filter(s => s.risk_level === "high").length,
    medium: students.filter(s => s.risk_level === "medium").length,
    low: students.filter(s => s.risk_level === "low").length,
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRiskFilter("all");
    setClassFilter("all");
  };

  return (
    <div className="min-h-screen aurora-bg-animated">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-medium text-white mb-2">Student Management / छात्र प्रबंधन</h1>
            <p className="text-white/70">
              Comprehensive student directory with detailed search and filtering / विस्तृत खोज और फ़िल्टरिंग के साथ व्यापक छात्र निर्देशिका
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-white text-primary hover:bg-white/90">
            <Link to="/upload">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Students / छात्र जोड़ें
            </Link>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Total Students / कुल छात्र
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-white">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-risk-high" />
                High Risk / उच्च जोखिम
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-risk-high">{stats.high}</div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-risk-medium" />
                Medium Risk / मध्यम जोखिम
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-risk-medium">{stats.medium}</div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-risk-low" />
                Low Risk / कम जोखिम
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-risk-low">{stats.low}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Filter className="h-5 w-5 mr-2" />
              Filter Students / छात्रों को फ़िल्टर करें
            </CardTitle>
            <CardDescription className="text-white/60">
              Search and filter students by name, risk level, or class / नाम, जोखिम स्तर या कक्षा के अनुसार छात्रों को खोजें और फ़िल्टर करें
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search students... / छात्रों को खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              {/* Risk Level Filter */}
              <Select value={riskFilter} onValueChange={(value: any) => setRiskFilter(value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Filter by risk level" />
                </SelectTrigger>
                <SelectContent className="bg-white/20 backdrop-blur-xl border-white/20">
                  <SelectItem value="all" className="text-white hover:bg-white/10">All Risk Levels / सभी जोखिम स्तर</SelectItem>
                  <SelectItem value="high" className="text-white hover:bg-white/10">High Risk / उच्च जोखिम</SelectItem>
                  <SelectItem value="medium" className="text-white hover:bg-white/10">Medium Risk / मध्यम जोखिम</SelectItem>
                  <SelectItem value="low" className="text-white hover:bg-white/10">Low Risk / कम जोखिम</SelectItem>
                </SelectContent>
              </Select>

              {/* Class Filter */}
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent className="bg-white/20 backdrop-blur-xl border-white/20">
                  <SelectItem value="all" className="text-white hover:bg-white/10">All Classes / सभी कक्षाएं</SelectItem>
                  {uniqueClasses.map(klass => (
                    <SelectItem key={klass} value={klass} className="text-white hover:bg-white/10">{klass}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button 
                variant="glass" 
                onClick={clearFilters}
                disabled={searchTerm === "" && riskFilter === "all" && classFilter === "all"}
                className="text-white border-white/25"
              >
                Clear Filters / फ़िल्टर साफ़ करें
              </Button>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || riskFilter !== "all" || classFilter !== "all") && (
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-white/60">Active filters:</span>
                {searchTerm && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    Search: "{searchTerm}"
                  </Badge>
                )}
                {riskFilter !== "all" && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    Risk: {riskFilter}
                  </Badge>
                )}
                {classFilter !== "all" && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    Class: {classFilter}
                  </Badge>
                )}
                <Badge 
                  className="cursor-pointer bg-white/10 text-white/70 hover:bg-white/20 border border-white/20"
                  onClick={clearFilters}
                >
                  Clear all ×
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-white/70">
            Showing {filteredStudents.length} of {students.length} students
          </p>
          {filteredStudents.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <span>Risk distribution:</span>
              <Badge className="bg-risk-high/80 text-white border-none">
                {filteredStudents.filter(s => s.risk_level === "high").length} High
              </Badge>
              <Badge className="bg-risk-medium/80 text-white border-none">
                {filteredStudents.filter(s => s.risk_level === "medium").length} Medium
              </Badge>
              <Badge className="bg-risk-low/80 text-white border-none">
                {filteredStudents.filter(s => s.risk_level === "low").length} Low
              </Badge>
            </div>
          )}
        </div>

        {/* Student Grid */}
        {filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Users className="h-16 w-16 text-white/40 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Students Found</h3>
              <p className="text-white/60 text-center mb-6">
                {students.length === 0 
                  ? "No students have been added yet." 
                  : "No students match your current filters. Try adjusting your search criteria."}
              </p>
              {students.length === 0 ? (
                <Button asChild className="bg-white text-primary hover:bg-white/90">
                  <Link to="/upload">Add Your First Student / अपना पहला छात्र जोड़ें</Link>
                </Button>
              ) : (
                <Button variant="glass" onClick={clearFilters} className="text-white border-white/25">
                  Clear Filters / फ़िल्टर साफ़ करें
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.student_id}
                student={student}
                onViewDetails={onStudentSelect}
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        {filteredStudents.length > 0 && (
          <Card className="glass-strong">
            <CardContent className="text-center py-8">
              <h3 className="text-lg font-medium text-white mb-2">
                Ready to help more students succeed? / अधिक छात्रों को सफल बनाने के लिए तैयार हैं? 🌟
              </h3>
              <p className="mb-4 text-white/70">
                Add more student data to get comprehensive risk assessments and personalized interventions / व्यापक जोखिम मूल्यांकन और व्यक्तिगत हस्तक्षेप प्राप्त करने के लिए अधिक छात्र डेटा जोड़ें
              </p>
              <Button asChild className="bg-white text-primary hover:bg-white/90">
                <Link to="/upload">Add More Students / अधिक छात्र जोड़ें</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
