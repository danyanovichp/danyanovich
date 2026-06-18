import re
with open('src/data/notionTemplates.ts') as f:
    text = f.read()
icons = re.findall(r'icon:\s*"([^"]+)"', text)
from collections import Counter
c = Counter(icons)
for icon, count in c.most_common():
    print(f"{count:3d} {icon}")
print(f"\nTotal unique icons: {len(c)}")
missing = [i for i in c if i not in {
    'Brain','Building2','Briefcase','ShoppingCart','FileStack','Lightbulb','Target','Heart','Clock',
    'Bot','FlaskConical','TrendingUp','Truck','CalendarOff','Receipt','MessageSquareText','ListTodo',
    'UtensilsCrossed','CalendarDays','Timer','GraduationCap','Shield','Sparkles','Users','RotateCcw',
    'CheckCircle','PieChart','Headphones','CheckSquare','BookOpen'
}]
print("Missing from iconMap:", missing)
