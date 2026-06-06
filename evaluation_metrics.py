import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# =====================================================================
# 1. FROM-SCRATCH IMPLEMENTATION OF CLASSIFICATION METRICS
# =====================================================================

def calculate_confusion_matrix(y_true, y_pred):
    """
    Calculates the 2x2 confusion matrix: [[TN, FP], [FN, TP]]
    """
    tp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 1)
    fp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 1)
    fn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 0)
    tn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 0)
    return [[tn, fp], [fn, tp]]

def calculate_precision(y_true, y_pred):
    """
    Calculates precision: TP / (TP + FP)
    """
    tp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 1)
    fp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 1)
    if (tp + fp) == 0:
        return 0.0
    return tp / (tp + fp)

def calculate_recall(y_true, y_pred):
    """
    Calculates recall (sensitivity): TP / (TP + FN)
    """
    tp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 1)
    fn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 0)
    if (tp + fn) == 0:
        return 0.0
    return tp / (tp + fn)

def calculate_f_beta(y_true, y_pred, beta=1):
    """
    Calculates F-beta score.
    F1-score corresponds to beta=1.
    F2-score (placing more emphasis on recall) corresponds to beta=2.
    """
    precision = calculate_precision(y_true, y_pred)
    recall = calculate_recall(y_true, y_pred)
    if precision + recall == 0:
        return 0.0
    beta_sq = beta ** 2
    return (1 + beta_sq) * (precision * recall) / ((beta_sq * precision) + recall)

def calculate_roc_curve(y_true, y_probs):
    """
    Calculates False Positive Rate (FPR) and True Positive Rate (TPR)
    at various probability thresholds.
    """
    # Pair and sort by probability descending
    paired = sorted(zip(y_probs, y_true), key=lambda x: x[0], reverse=True)
    
    n_pos = sum(y_true)
    n_neg = len(y_true) - n_pos
    
    if n_pos == 0 or n_neg == 0:
        raise ValueError("Both positive and negative classes must be present in y_true.")
        
    fpr = [0.0]
    tpr = [0.0]
    thresholds = [paired[0][0] + 1.0] # Initial dummy threshold > 1.0
    
    tp = 0
    fp = 0
    
    for i in range(len(paired)):
        if paired[i][1] == 1:
            tp += 1
        else:
            fp += 1
        
        # Record a point only when the next probability changes or at the end
        if i == len(paired) - 1 or paired[i][0] != paired[i+1][0]:
            fpr.append(fp / n_neg)
            tpr.append(tp / n_pos)
            thresholds.append(paired[i][0])
            
    return fpr, tpr, thresholds

def calculate_auc_roc(fpr, tpr):
    """
    Calculates the Area Under the ROC Curve (AUC-ROC) using the trapezoidal rule.
    """
    auc = 0.0
    for i in range(1, len(fpr)):
        # Width * Average Height of the trapezoid panel
        auc += (fpr[i] - fpr[i-1]) * (tpr[i] + tpr[i-1]) / 2.0
    return auc


# =====================================================================
# 2. DATASET GENERATION & MODEL TRAINING
# =====================================================================

if __name__ == "__main__":
    # Generate an imbalanced synthetic dataset (90% negative, 10% positive)
    print("Generating synthetic imbalanced dataset...")
    X, y = make_classification(
        n_samples=1000, 
        n_features=10, 
        weights=[0.9, 0.1], 
        random_state=42
      )

    # Split into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )

    # Train a simple Logistic Regression classifier
    model = LogisticRegression(random_state=42)
    model.fit(X_train, y_train)

    # Get predictions and probabilities
    y_pred = model.predict(X_test).tolist()
    y_probs = model.predict_proba(X_test)[:, 1].tolist()
    y_true = y_test.tolist()

    # =====================================================================
    # 3. METRICS EVALUATION (USING OUR CUSTOM PURE-PYTHON IMPLEMENTATIONS)
    # =====================================================================
    print("\n--- METRICS EVALUATION (From Scratch) ---")
    
    # Confusion Matrix
    cm = calculate_confusion_matrix(y_true, y_pred)
    print("Confusion Matrix:")
    print(f"  Predicted 0 | Predicted 1")
    print(f"Actual 0:  {cm[0][0]:<10} | {cm[0][1]}")
    print(f"Actual 1:  {cm[1][0]:<10} | {cm[1][1]}")
    print()

    # Precision, Recall, F1, F2
    precision = calculate_precision(y_true, y_pred)
    recall = calculate_recall(y_true, y_pred)
    f1 = calculate_f_beta(y_true, y_pred, beta=1)
    f2 = calculate_f_beta(y_true, y_pred, beta=2)
    
    print(f"Precision: {precision:.4f}")
    print(f"Recall (Sensitivity): {recall:.4f}")
    print(f"F1-Score: {f1:.4f}")
    print(f"F2-Score: {f2:.4f}")
    
    # ROC and AUC
    fpr, tpr, thresholds = calculate_roc_curve(y_true, y_probs)
    auc_roc = calculate_auc_roc(fpr, tpr)
    print(f"AUC-ROC: {auc_roc:.4f}")

    # =====================================================================
    # 4. PLOTTING THE ROC CURVE
    # =====================================================================
    plt.figure(figsize=(8, 6))
    plt.plot(fpr, tpr, color='blue', lw=2, label=f'ROC Curve (AUC = {auc_roc:.4f})')
    plt.plot([0, 1], [0, 1], color='red', lw=1.5, linestyle='--', label='Random Guess')
    
    plt.xlim([-0.01, 1.01])
    plt.ylim([-0.01, 1.01])
    plt.xlabel('False Positive Rate (FPR)')
    plt.ylabel('True Positive Rate (TPR)')
    plt.title('Receiver Operating Characteristic (ROC) Curve')
    plt.legend(loc="lower right")
    plt.grid(True, linestyle='--', alpha=0.5)
    
    output_image = 'roc_curve.png'
    plt.savefig(output_image, dpi=300, bbox_inches='tight')
    print(f"\nROC Curve plot saved successfully to '{output_image}'.")
    plt.show()
